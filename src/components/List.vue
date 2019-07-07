<template>
  <div class="col-6 text-left">
    <v-card flat color="transparent">
      <v-subheader>Filtrer votre recherche</v-subheader>
      <br>
      <v-flex offset-xs2 xs8>
        <v-range-slider
          v-model="range"
          :max="5"
          :min="1"
          step="1"
          :tick-labels="tickLabels"
          thumb-label="always"
        ></v-range-slider>
      </v-flex>
    </v-card>
    <hr>
    <h4 class="text-center">Liste des restaurants à proximité</h4>
    <ul>
      <app-list-element v-for="(restaurant, index) in list" :restaurant="restaurant" :key="index"></app-list-element>
      {{ $store.getters.getCurrentLat}}
      {{ $store.getters.getCurrentLong }}
      {{ $store.getters.getRange[0] }}
      {{ $store.getters.getRange[1] }}
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
  data: function() {
    return {
      tickLabels: ["1⭐", "2⭐", "3⭐", "4⭐", "5⭐"]
    };
  },
  computed: {
    ...mapGetters({
      list: "getList"
    }),
    range: {
      get() {
        return this.$store.getters.range;
      },
      set(value) {
        this.$store.dispatch("updateRange", value);
      }
    }
  }
};
</script>

<style scope>
ul {
  list-style-type: none;
}
</style>
