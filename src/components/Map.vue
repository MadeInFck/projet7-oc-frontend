<template>
  <div class="col-6 text-center" id="map">

   
  </div>
</template>
 
<script>
import { mapGetters, mapActions } from "vuex";
import gmapsInit from '../utils/gmaps';

export default {
  computed: {
    ...mapGetters({
      currentLat: 'getCurrentLat',
      currentLong: 'getCurrentLong'
    })
  },
  methods: {
    
  },
  async mounted() {
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition( position => {
            this.$store.dispatch('updateCurrentLat', position.coords.latitude);
            this.$store.dispatch('updateCurrentLong',position.coords.longitude);
            });
    }
  
    try {
        const google = await gmapsInit();
        const position = new google.maps.LatLng(this.$store.getters.getCurrentLat, this.$store.getters.getCurrentLong);
        const options = {
            zoom: 15,
            center: position,
            mapTypeId: 'satellite'
        };
        
        const iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        const map = new google.maps.Map(this.$el, options);
        const marker = new google.maps.Marker({
          position: position,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: iconBase + 'info-i_maps.png'
          });
        this.$store.dispatch('loadData');
    }
    catch (error) {
        console.error(error);
    }
    
  }
};
</script>

<style scoped>

</style>