<template>
  <v-app>
    <app-header></app-header>
    <div class="container-fluid">
      <div class="row" id="content">
        <app-map></app-map>
        <app-list></app-list>
      </div>
    </div>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import GMap from "./components/Map.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer";

export default {
  components: {
    appHeader: Header,
    appMap: GMap,
    appList: List,
    appFooter: Footer
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        position => {
          this.$store.dispatch("updateCurrentLat", position.coords.latitude);
          this.$store.dispatch("updateCurrentLong", position.coords.longitude);
        },
        null,
        { enableHighAccuracy: true }
      );
    } else {
      console.log("Pas de géolocalisation !");
    }
    this.$store.dispatch("loadData");
  }
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

header {
  color: white;
  padding-bottom: 20px;
}

#content {
  min-height: 480px;
  height: 100%;
  margin: 15px auto 30px auto;
}
</style>
