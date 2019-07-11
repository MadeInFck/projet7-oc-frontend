<template>
  <div class="col-6 text-center">
    <app-modal
      :coordsNewRestaurant="coordsNewRestaurant"
      :dialog="dialog"
      @modalClosed="dialog=$event"
    ></app-modal>
    {{ coordsNewRestaurant }}
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
      markers: [],
      google: null,
      dialog: false,
      coordsNewRestaurant: null
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
      range: "getRange"
    })
  },
  methods: {
    displayMarkers: function() {
      //Erase all markers
      this.clearAllMarkers();
      //Filter list to retrieve only restaurants whose average is within range
      const listMarkers = this.list.filter(item => {
        let sum = 0;
        for (let i = 0; i < item.ratings.length; i++) {
          sum += item.ratings[i].stars;
        }
        let average = sum / item.ratings.length;
        if (average <= this.range[1] && average >= this.range[0]) {
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
      });
    },
    //Clear all markers on map
    clearAllMarkers: function() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
    displayNewRestaurant: function() {
      const newRestaurant = this.list[this.list.length - 1];
      const positionNewMarker = new this.google.maps.LatLng(newRestaurant.lat, newRestaurant.long);
      const marker = new this.google.maps.Marker({
          position: positionNewMarker,
          map: this.map,
          title: newRestaurant.restaurantName
        });
        this.markers.push(marker); 
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
        zoom: 15,
        center: position,
        mapTypeId: "satellite",
        streetViewControl: false,
        scrollwheel: true
      };

      this.map = new this.google.maps.Map(this.$el, options);

      // Add marker on current position
      new this.google.maps.Marker({
        position: position,
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        },
        title: "Position actuelle"
      });
      this.displayMarkers();

      //Capture zoom in/out or pan to update bounds in store
      this.google.maps.event.addListener(this.map, "idle", () => {
        let bounds = this.map.getBounds();
        let boundsToSet = {};
        boundsToSet.north = bounds.getNorthEast().lat();
        boundsToSet.east = bounds.getNorthEast().lng();
        boundsToSet.south = bounds.getSouthWest().lat();
        boundsToSet.west = bounds.getSouthWest().lng();
        this.$store.dispatch("updateBounds", bounds);
        eventBus.$emit("boundsChanged", bounds);
      });

      //Capture click on map
      this.map.addListener("click", event => {
        let latitude = event.latLng.lat();
        let longitude = event.latLng.lng();
        this.map.panTo(new google.maps.LatLng(latitude, longitude));
        this.coordsNewRestaurant = { lat: latitude, lng: longitude };
        this.dialog = true;
      });
    } catch (error) {
      console.error(error);
    }
  },
  created() {
    //When range changes in List component, update markers
    eventBus.$on("rangeChanged", range => {
      this.displayMarkers();
    });
    eventBus.$on("modalClosed", bool => {
      this.dialog = false;
      this.displayMarkers;
    });
    eventBus.$on("newRestaurantAdded", () => {
      this.displayNewRestaurant();
    });
  }
};
</script>

<style scoped>
</style>