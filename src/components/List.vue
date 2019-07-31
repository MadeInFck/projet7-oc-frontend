<template>
  <div class="col-12 col-sm-6 text-left">
    <v-card flat color="transparent">
      <v-subheader>Filtrer votre recherche</v-subheader>
      <br />
      <v-flex offset-xs2 xs8>
        <v-range-slider
          v-model="range"
          :max="5"
          :min="1"
          :step="1"
          :tick-labels="tickLabels"
          thumb-label="always"
        ></v-range-slider>
      </v-flex>
    </v-card>
    <hr />
    <h4 class="text-center">Liste des restaurants à proximité</h4>
    <ul class="list">
      <app-list-element v-for="(restaurant, index) in list" :restaurant="restaurant" :key="index"></app-list-element>
    </ul>
  </div>
</template>
 
<script>
import Element from "./ListElement.vue";
import { eventBus } from "../main";
import { mapGetters } from "vuex";

export default {
  components: {
    appListElement: Element
  },
  data: function() {
    return {
      tickLabels: ["1⭐", "2⭐", "3⭐", "4⭐", "5⭐"],
      google: null
    };
  },
  computed: {
    ...mapGetters({
      list: "getList"
    }),
    range: {
      get() {
        return this.$store.getters.getRange;
      },
      set(value) {
        this.$store.dispatch("updateRange", value);
        eventBus.$emit("rangeChanged", this.range);
      }
    }
  }
};
</script>

<style>
ul {
  list-style-type: none;
}

.list {
  max-height: 300px;
  width: 100%;
  padding-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
