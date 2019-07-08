<template>
  <div>
    <img v-bind:src="image" />
  </div>
  
</template>

<script>
import gmapsInit from "../utils/gmaps";
import axios from "axios";
export default {
  props: ["restaurant"],
  data: function() {
    return {
      image: ""
    };
  },
  methods: {
    imageEncode: function(arrayBuffer) {
      let u8 = new Uint8Array(arrayBuffer);
      let b64encoded = btoa(
        [].reduce.call(
          new Uint8Array(arrayBuffer),
          function(p, c) {
            return p + String.fromCharCode(c);
          },
          ""
        )
      );
      let mimetype = "image/jpg";
      return "data:" + mimetype + ";base64," + b64encoded;
    }
  },
  async mounted() {
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/streetview?location=" + this.restaurant.lat + "," + this.restaurant.long + "&size=400x400&fov=90&pitch=10&key=AIzaSyA_fr7kCL4Itf8Ihl6O31BVsttti8jwtNs",
        {
          headers: {
            accept: "image/jpeg"
          },
          responseType: "arraybuffer"
        }
      );
      this.image = this.imageEncode(response.data);
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style>
</style>