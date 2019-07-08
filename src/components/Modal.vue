<template>
  <div v-if="dialog">
    <v-layout row>
      <v-dialog lazy origin width="400" dark v-model="dialog">
        <v-card>
          <div id="streetview">
            <app-streetview :restaurant="restaurant"></app-streetview>
          </div>
          <div id="modal-text">
            <v-card-title
              class="headline d-flex justify-content-center"
            >{{ restaurant.restaurantName }}</v-card-title>
            <v-card-text
              class="d-flex justify-content-center"
              v-for="rating in restaurant.ratings"
            >{{ rating.stars }} étoiles : {{ rating.comment }}</v-card-text>
          </div>

          <v-card-actions class="d-flex justify-content-center">
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="closeModal">Fermer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
 
<script>
import Streetview from "./Streetview.vue";

export default {
  components: {
    appStreetview: Streetview
  },
  props: {
    dialog: Boolean,
    restaurant: Object
  },
  methods: {
    closeModal: function() {
      this.dialog = false;
      this.$emit("modalClosed", false);
    }
  }
};
</script>
<style >

</style>