<template>
  <div>
    <app-header></app-header>
    <div class="container-fluid">
      <div class="row" id="content">
        <app-map></app-map>
        <app-list></app-list>
      </div>
      
    </div>
    <app-footer></app-footer>
  </div>
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
  }
};
</script>

<style>
/* body {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  min-height: 100%;
  min-width: 100%;
  height: 100%;
  width: 100%;
} */

header {
  color: white;
  padding-bottom: 20px;
}

#content {
  min-height: 480px;
  height: 600px;
  margin: 15px auto 30px auto;
}
</style>
