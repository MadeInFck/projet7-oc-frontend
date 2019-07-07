<template>
  <div v-if="dialog">
    <v-layout row justify-center>
      <v-dialog v-model="dialog">
        <v-card>
          <div>
            <app-streetview :restaurant="restaurant"></app-streetview>
          </div>
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
<style>
</style>