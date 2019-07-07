<template>
  <div class="col-6 text-center"></div>
</template>
 
<script>
import { mapGetters } from "vuex";
import gmapsInit from "../utils/gmaps";

export default {
  data: function() {
    return {
      map: null,
      markers: [],
      google: null
    };
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
      this.clearAllMarkers();
      const listMarkers = this.list.map(item => {
        let sum = 0;
        for (let i = 0; i < item.ratings.length; i++) {
          sum += item.ratings[i].stars;
        }
        let average = sum / item.ratings.length;
        console.log(average, this.range)
        if (average < this.range[1] && average > this.range[0]) {
          return { lat: item.lat, long: item.long, name: item.restaurantName };
        }
      });
      console.log(listMarkers);
      listMarkers.forEach(element => {
        const positionMarker = new this.google.maps.LatLng(
          element.lat,
          element.long
        );
        const marker = new this.google.maps.Marker({
          position: positionMarker,
          map: this.map,
          animation: this.google.maps.Animation.DROP,
          title: element.restaurantName
        });
        this.markers.push(marker);
      });
    },
    clearAllMarkers: function() {
      for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }
        this.markers = [];
    }
  },
  async mounted() {
    try {
      this.google = await gmapsInit();
      const position = new this.google.maps.LatLng(
        this.currentLat,
        this.currentLong
      );
      const options = {
        zoom: 15,
        center: position,
        mapTypeId: "satellite",
        streetViewControl: false,
        scrollwheel: true
      };

      this.map = new this.google.maps.Map(this.$el, options);
      //this.map.panTo(new google.maps.LatLng(this.currentLat, this.currentLong));
      const marker = new this.google.maps.Marker({
        position: position,
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        },
        title: "Position actuelle"
      });
      this.displayMarkers();
      this.google.maps.event.addListener(this.map, "idle", () => {
        let bounds = this.map.getBounds();
        let boundsToSet = {};
        boundsToSet.north = bounds.getNorthEast().lat();
        boundsToSet.east = bounds.getNorthEast().lng();
        boundsToSet.south = bounds.getSouthWest().lat();
        boundsToSet.west = bounds.getSouthWest().lng();
        this.$store.dispatch("updateBounds", bounds);
        this.displayMarkers();
        console.log(this.markers);
      });
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style scoped>
</style>