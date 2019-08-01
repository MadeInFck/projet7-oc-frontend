<template>
  <div v-if="restaurant.rating >= range[0] && restaurant.rating <= range[1] && needToDisplay">
    <li @click="openModal" class="row">
      <p class="col-8 mx-auto">{{ restaurant.restaurantName }}</p>
      <p class="col-2 offset-2 my-auto">
        <span>{{ restaurant.rating }} ⭐</span>
      </p>
    </li>
    <app-modal :restaurant="restaurant" :dialog="dialog" :loading="loading" @modalClosed="dialog=$event"></app-modal>
  </div>
</template>

<script>
import Modal from "./ModalRestaurant.vue";
import { mapGetters } from "vuex";
import { eventBus } from "../main";

export default {
  props: ["restaurant"],
  data() {
    return {
      dialog: false,
      loading: false
    };
  },
  components: {
    appModal: Modal
  },
  computed: {
    ...mapGetters({
      bounds: "getBounds",
      range: "getRange",
      google: "getGoogle",
      map: "getMap"
    }),
    //Check if item needs to be displayed : within map bounds each time they're updated
    needToDisplay() {
      if (!this.bounds) {
        return;
      }
      if (
        this.restaurant.long >= this.bounds.ga.j &&
        this.restaurant.long <= this.bounds.ga.l &&
        this.restaurant.lat >= this.bounds.na.j &&
        this.restaurant.lat <= this.bounds.na.l
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    openModal() {
      this.dialog = !this.dialog;
      if (this.restaurant.placeId == "") {
        return;
      }
      if (this.restaurant.ratings.length > 0) {
        return;
      }
      this.loading = true;
      let request = {
        placeId: this.restaurant.placeId,
        fields: ["formatted_address", "reviews"]
      };

      let service = new this.google.maps.places.PlacesService(this.map);
      service.getDetails(request, (place, status) => {
        
        if (status == this.google.maps.places.PlacesServiceStatus.OK) {
          for (let j = 0; j < place.reviews.length; j++) {
            this.restaurant.ratings.push({
              stars: place.reviews[j].rating,
              comment: place.reviews[j].text
            });
          }
          this.restaurant.address = place.formatted_address;
          this.loading = false;
        } else {
          console.log("List element : ",status);
        }
        
      });
    }
  },
  created() {
    eventBus.$on("boundsChanged", bounds => {
      this.$forceUpdate();
    });
  }
};
</script>

<style scoped>
li {
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 10px 5px 5px gray;
  margin-bottom: 5px;
  font-size: 1.5em;
}

li:hover {
  cursor: pointer;
}
</style>