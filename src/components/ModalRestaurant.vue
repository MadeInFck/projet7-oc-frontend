<template>
  <div>
    <div v-if="dialog">
      <v-layout row>
        <v-dialog lazy origin width="400" dark v-model="dialog">
          <v-card>
            <div id="streetview">
              <app-streetview :restaurant="restaurant"></app-streetview>
            </div>
              <app-bounce-loader class="mx-auto" loading="loading" color="rgb(93,156,82)" size="80" sizeUnit="px"></app-bounce-loader>
            <div id="modal-text">
              <v-card-title
                class="headline d-flex justify-content-center"
              >{{ restaurant.restaurantName }}</v-card-title>
              <v-card-text
                v-for="(rating, index) in restaurant.ratings"
                :key="index"
              >{{ rating.stars }} ⭐ : {{ rating.comment }}</v-card-text>
            </div>

            <v-card-actions justify-center>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="openRatingModal">Donner son avis</v-btn>
              <v-btn color="green darken-1" flat @click="closeModal">Fermer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </div>
    <app-newrating
      :restaurant="restaurant"
      :dialogRating="dialogRating"
      @modalClosed="dialogRating=$event"
    ></app-newrating>
  </div>
</template>

<script>
import Streetview from "./Streetview.vue";
import ModalNewRating from "./ModalNewRating.vue";
import { BounceLoader } from "@saeris/vue-spinners";

export default {
  components: {
    appStreetview: Streetview,
    appNewrating: ModalNewRating,
    appBounceLoader: BounceLoader
  },
  props: {
    dialog: Boolean,
    restaurant: Object,
    loading: Boolean
  },
  data() {
    return {
      dialogRating: false
    };
  },
  methods: {
    closeModal() {
      this.$emit("modalClosed", false);
    },
    openRatingModal() {
      this.$emit("modalClosed", false);
      this.dialogRating = true;
    }
  }
};
</script>
<style>
#streetview,
#modal-text {
  width: 400px;
  margin-bottom: 10px;
}
</style>