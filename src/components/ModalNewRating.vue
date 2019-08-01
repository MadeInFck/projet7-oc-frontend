<template>
  <div v-if="dialogRating">
    <v-layout row justify-center>
      <v-dialog v-model="dialogRating" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span
              class="headline"
            >Donner votre avis sur ce restaurant : {{ restaurant.restaurantName }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm2 md4>
                  <v-select
                    v-model="stars"
                    :items="items"
                    :error-messages="starsErrors"
                    label="Note"
                    @change="$v.stars.$touch()"
                    @blur="$v.stars.$touch()"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm10 md8>
                  <v-textarea
                    v-model="opinion"
                    :error-messages="opinionErrors"
                    label="Donnez votre avis"
                    @input="$v.opinion.$touch()"
                    @blur="$v.opinion.$touch()"
                    auto-grow
                    box
                    rows="2"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
            <small>* Tous les champs sont obligatoires</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="closeModal">Fermer</v-btn>
            <v-btn color="green darken-1" text @click="addRating">Ajouter</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { eventBus } from "../main";

export default {
  mixins: [validationMixin],
  validations: {
    stars: { required },
    opinion: { required }
  },
  props: {
    dialogRating: Boolean,
    restaurant: Object
  },
  data: () => ({
    stars: "",
    opinion: "",
    items: ["1⭐", "2⭐", "3⭐", "4⭐", "5⭐"]
  }),
  computed: {
    ...mapGetters({
      list: "getList"
    }),
    starsErrors() {
      const errors = [];
      if (!this.$v.stars.$dirty) return errors;
      !this.$v.stars.required && errors.push("Merci de donner une note.");
      return errors;
    },
    opinionErrors() {
      const errors = [];
      if (!this.$v.opinion.$dirty) return errors;
      !this.$v.opinion.required && errors.push("Merci de donner votre avis.");
      return errors;
    }
  },
  methods: {
    closeModal() {
      //Reset form
      this.$v.$reset();
      this.stars = "";
      this.opinion = "";
      this.$emit("modalClosed", false);
    },
    addRating() {
      //Test if form is valid
      this.$v.$touch();
      if (this.$v.$invalid) return;
      //Get new rating and dispatch it to the store
      let data = this.restaurant;
      data.ratings.push({
        stars: Number(this.stars[0]),
        comment: this.opinion
      });
      console.log(this.restaurant.ratingsNumber, this.restaurant.rating);
      data.rating = (((this.restaurant.ratingsNumber * this.restaurant.rating) + Number(this.stars[0])) / (this.restaurant.ratingsNumber + 1)).toFixed(1);
      data.ratingsNumber ++;
      console.log(data.ratingsNumber, data.rating, data.ratings);
      this.$store.dispatch("updateRating", data);
      //Reset form
      this.stars = "";
      this.opinion = "";
      this.$emit("modalClosed", false);
    }
  }
};
</script>

<style>
</style>