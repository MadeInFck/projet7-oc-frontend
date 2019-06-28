<template>
  <div>
    <div id="streetview"></div>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="290">
        <!-- <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
        </template>-->
        <v-card>
            <v-card-title class="headline">{{ restaurant.restaurantName }}</v-card-title>
            <v-card-text
            v-for="rating in restaurant.ratings"
            >{{ rating.stars }} étoiles : {{ rating.comment }}</v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="closeModal">Fermer</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </v-layout>
  </div>
</template>
 
<script>

export default {
  props: ['dialog', 'restaurant'],
  data() {
    return {
      dialog: false
    };
  },
  methods: {
      closeModal: function() {
          this.dialog=false;
          
      }
  },
  async mounted() {
    try {
      const google = await gmapsInit();
      const position = new google.maps.LatLng(restaurant.lat, restaurant.long);
      const map = new google.maps.Map(this.$el, {
          center: position,
          zoom: 14
      });
      const streetview = new google.maps.StreetViewPanorama(
          document.getElementById('streetview'), {
              position: position,
              pov: {
                  heading: 34,
                  pitch: 10
              }
          }); 
      map.setStreetView(panorama);
    }
    catch (error) {
        console.error(error);
    }
  }
};
</script>
<style>
</style>