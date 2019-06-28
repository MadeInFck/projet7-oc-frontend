<template>
  <div class="col-6 text-left">
    <h4 class="text-center">Liste des restaurants à proximité</h4>
    <ul>
      <app-list-element v-for="restaurant in list" :restaurant="restaurant" :key="restaurant.restaurantName"></app-list-element>
      {{ $store.getters.getCurrentLat}}
      {{ $store.getters.getCurrentLong }}
    </ul>
    
  </div>
</template>
 
<script>
import { mapGetters } from "vuex";
import Element from "./ListElement.vue";
export default {
  components: {
    appListElement: Element
  },
  computed: {
    ...mapGetters({
      list: "getList"
    })
  }
};
</script>

<style scope>
ul {
  list-style-type: none;
}
</style>
