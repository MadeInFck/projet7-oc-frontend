<template>
  <div v-if="average >= range[0] && average <= range[1] && needToDisplay">
    <li @click="dialog = !dialog" class="row">
      <p class="col-8 my-auto">{{ restaurant.restaurantName }}</p>
      <p class="col-2 offset-2 my-auto">
        <span>{{ average }} ⭐</span>
      </p>
    </li>
    <app-modal :restaurant="restaurant" :dialog="dialog" @modalClosed="dialog=$event"></app-modal>
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
      dialog: false
    };
  },
  components: {
    appModal: Modal
  },
  computed: {
    ...mapGetters({
      bounds: "getBounds",
      range: "getRange"
    }),
    //Compute average of ratings
    average() {
      let sum = 0;
      for (let i = 0; i < this.restaurant.ratings.length; i++) {
        sum += this.restaurant.ratings[i].stars;
      }
      return (sum / this.restaurant.ratings.length).toFixed(1);
    },
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
    computeNewAverage() {
      console.log(this.restaurant.ratings.length);
      let sum = 0;
      for (let i = 0; i < this.restaurant.ratings.length; i++) {
        console.log(this.restaurant.ratings[i].stars);
        sum += this.restaurant.ratings[i].stars;
      }
      let newAverage = (sum / this.restaurant.ratings.length).toFixed(1);
      console.log("new average", this.newAverage);
      this.average = 4;
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