<template>
  <div>
      <li v-on:click="dialog = true">
        <span class="col-3"> {{ restaurant.restaurantName }} </span>
        <span class="col-3 offset-1"> {{ average }} étoiles </span>  
      </li>
      <app-modal :restaurant="restaurant" :dialog="dialog"></app-modal>
  </div>
  
</template>

<script>
import Modal from "./Modal.vue";

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
      average: function() {
        let sum = 0;
        for (let i=0; i < this.restaurant.ratings.length; i++) {
          sum += this.restaurant.ratings[i].stars;
        }

        return sum/this.restaurant.ratings.length;
      }
    }
};
</script>

<style scoped>
font-size: 20px;
</style>