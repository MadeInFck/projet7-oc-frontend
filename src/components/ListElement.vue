<template>
  <div
    v-if="average >= range[0] && average <= range[1] && needToDisplay"
  >
    <li @click="dialog = !dialog" class="row">
      <p class="col-6">{{ restaurant.restaurantName }}</p>
      <p class="col-5 offset-1">
        <span>{{ average }} étoiles</span>
      </p>
    </li>
    <app-modal :restaurant="restaurant" :dialog="dialog" @modalClosed="dialog=$event"></app-modal>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import { mapGetters } from "vuex";
import { eventBus } from "../main";

export default {
    props: ['restaurant'],
    data () {
      return {
        dialog: false
      }
    },
    components: {
      appModal: Modal
    },
    computed: {
      ...mapGetters({
      bounds: 'getBounds',
      range: 'getRange'
      }),
      average: function() {
        let sum = 0;
        for (let i=0; i < this.restaurant.ratings.length; i++) {
          sum += this.restaurant.ratings[i].stars;
        }
        return sum/this.restaurant.ratings.length;
      },
      needToDisplay() {
        if (this.restaurant.long >= this.bounds.ga.j && this.restaurant.long <= this.bounds.ga.l && this.restaurant.lat >= this.bounds.na.j && this.restaurant.lat <= this.bounds.na.l) {
          return true;
        } else {
          return false;
        }
      }
    },
    created() {
      eventBus.$on('boundsChanged', (bounds) => {
      this.$forceUpdate();
    })
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
</style>