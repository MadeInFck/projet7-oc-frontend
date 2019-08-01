<template>
  <div id="map" class="col-12 col-sm-6 text-center">
    <app-modal
      :coordsNewRestaurant="coordsNewRestaurant"
      :dialog="dialog"
      :list="list"
      @modalClosed="dialog = $event"
    ></app-modal>
  </div>
</template>

<script>
import Modal from "./ModalAddRestaurant";
import { mapGetters } from "vuex";
import gmapsInit from "../utils/gmaps";
import { eventBus } from "../main";

export default {
  data: function() {
    return {
      map: null,
      google: null,
      service: null,
      infoWindow: null,
      markers: [],
      dialog: false,
      coordsNewRestaurant: null,
      listResultsDetailed: [],
      currentCenter: { lat: this.currentLat, lng: this.currentLong }
    };
  },
  components: {
    appModal: Modal
  },
  computed: {
    ...mapGetters({
      currentLat: "getCurrentLat",
      currentLong: "getCurrentLong",
      list: "getList",
      range: "getRange",
      bounds: "getBounds"
    })
  },
  methods: {
    displayMarkers() {
      //Erase all markers
      this.clearAllMarkers();
      //Filter list to retrieve only restaurants whose average is within range
      if (this.list == undefined) {
        return;
      }
      const listMarkers = this.list.filter(item => {
        if (item.rating <= this.range[1] && item.rating >= this.range[0]) {
          return { lat: item.lat, long: item.long, name: item.restaurantName };
        }
      });

      //For each previously filtered list, set marker
      listMarkers.forEach(element => {
        const positionMarker = new this.google.maps.LatLng(
          element.lat,
          element.long
        );
        const marker = new this.google.maps.Marker({
          position: positionMarker,
          map: this.map,
          title: element.restaurantName
        });
        this.markers.push(marker);
        let infoWindow = new google.maps.InfoWindow();
        this.google.maps.event.addListener(
          marker,
          "click",
          function() {
            infoWindow.setContent(element.restaurantName);
            infoWindow.open(this.map, this);
          },
          { passive: true }
        );
      });
    },
    //Clear all markers on map
    clearAllMarkers() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    } ,
    displayNewRestaurant() {
      const newRestaurant = this.list[this.list.length - 1];
      const positionNewMarker = new this.google.maps.LatLng(
        newRestaurant.lat,
        newRestaurant.long
      );
      const marker = new this.google.maps.Marker({
        position: positionNewMarker,
        map: this.map,
        title: newRestaurant.restaurantName
      });
      this.markers.push(marker);
      this.google.maps.event.addListener(
        marker,
        "click",
        function() {
          this.infoWindow.setContent(newRestaurant.restaurantName);
          this.infoWindow.open(this.map, marker);
        },
        { passive: true }
      );
    },
    displayGooglePlaces(request) {
      this.service.nearbySearch(request, (results, status) => {
        if (status == this.google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            let newRestaurant = {
              restaurantName: results[i].name,
              address: results[i].formatted_address,
              lat: results[i].geometry.location.lat(),
              long: results[i].geometry.location.lng(),
              placeId: results[i].place_id,
              rating: results[i].rating.toFixed(1),
              ratings: [],
              ratingsNumber: results[i].user_ratings_total
            };
            let presence = false;
            for (let restaurant of this.list) {
              if (restaurant.restaurantName == newRestaurant.restaurantName) {
                presence = true;
              }
            }
            if (!presence) this.listResultsDetailed.push(newRestaurant);
          }
          this.$store.dispatch("loadData", this.listResultsDetailed);
          //Display markers from data list in store
          let center = new this.google.maps.LatLng(
            this.currentCenter.lat,
            this.currentCenter.lng
          );
          this.map.setCenter(center);
        } else {
          console.log("Status nearbysearch : ", status);
        }
      });
      this.displayMarkers();
    },
    geolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.$store.dispatch("updateCurrentLat", position.coords.latitude);
            this.$store.dispatch(
              "updateCurrentLong",
              position.coords.longitude
            );
            this.currentCenter = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.map.setCenter(this.currentCenter);
            // Add marker on current position
            const marker = new this.google.maps.Marker({
              position: this.currentCenter,
              map: this.map,
              animation: this.google.maps.Animation.DROP,
              icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
              },
              title: "Position actuelle"
            });
            let infoWindow = new google.maps.InfoWindow();

            this.google.maps.event.addListener(
              marker,
              "click",
              function() {
                infoWindow.setContent("Position actuelle");
                infoWindow.open(this.map, this);
              },
              { passive: true }
            );
          },
          () => {
            this.handleLocationError(
              true,
              this.infoWindow,
              this.map.getCenter()
            );
          },
          { enableHighAccuracy: true }
        );
      } else {
        this.handleLocationError(false, this.infoWindow, this.map.getCenter());
      }
    },
    handleLocationError(browserHasGeolocation, infoWindow, pos) {
      this.infoWindow.setPosition(pos);
      this.infoWindow.setContent(
        browserHasGeolocation
          ? "Erreur: le service de geolocalisation n'est pas disponible."
          : "Erreur: votre navigateur ne supporte pas la géolocalisation."
      );
      this.infoWindow.open(this.map);
    }
  },
  async mounted() {
    try {
      //Init Google Maps API
      this.google = await gmapsInit();

      const position = new this.google.maps.LatLng(
        this.currentLat,
        this.currentLong
      );

      //Set and instantiate map
      const options = {
        zoom: 18,
        center: position,
        mapTypeId: "satellite",
        streetViewControl: false,
        scrollwheel: false
      };

      this.map = new this.google.maps.Map(this.$el, options);
      this.infoWindow = new this.google.maps.InfoWindow();
      this.geolocation();

      //Set google places service
      this.service = new this.google.maps.places.PlacesService(this.map);

      //Capture zoom in/out or pan to update bounds in store
      this.google.maps.event.addListener(
        this.map,
        "idle",
        () => {
          let bounds = this.map.getBounds();
          this.$store.dispatch("updateBounds", bounds);
          eventBus.$emit("boundsChanged", bounds);
          const lat = this.map.getCenter().lat();
          const lng = this.map.getCenter().lng();
          this.currentCenter = { lat: lat, lng: lng };

          const request = {
            location: this.currentCenter,
            radius: "1000",
            type: ["restaurant"]
          };

          this.displayGooglePlaces(request);
        },
        { passive: true }
      );

      //Capture click on map
      this.map.addListener(
        "click",
        event => {
          let latitude = event.latLng.lat();
          let longitude = event.latLng.lng();
          this.map.panTo(new this.google.maps.LatLng(latitude, longitude));
          this.coordsNewRestaurant = { lat: latitude, lng: longitude };
          this.dialog = true;
        },
        { passive: true }
      );

      this.$store.dispatch("updateGoogle", this.google);
      this.$store.dispatch("updateMap", this.map);
    } catch (error) {
      console.error(error);
    }
  },
  created() {
    //When range changes in List component, update markers
    eventBus.$on("rangeChanged", () => {
      this.displayMarkers();
    });
    eventBus.$on("modalClosed", () => {
      this.dialog = false;
      this.displayMarkers();
    });
    /* eventBus.$on("newRestaurantAdded", () => {
      this.displayMarkers();
    }); */
  }
};
</script>

<style scoped>
#map {
  min-height: 400px;
  max-height: 100%
}
</style>
