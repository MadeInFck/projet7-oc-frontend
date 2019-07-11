<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Ajouter un nouveau restaurant</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  label="Nom du restaurant"
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="number"
                  :error-messages="numberErrors"
                  label="Numéro"
                  @input="$v.number.$touch()"
                  @blur="$v.number.$touch()"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="street"
                  :error-messages="streetErrors"
                  label="Rue"
                  @input="$v.street.$touch()"
                  @blur="$v.street.$touch()"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="zipcode"
                  :error-messages="zipCodeErrors"
                  label="Code postal"
                  @input="$v.zipcode.$touch()"
                  @blur="$v.zipcode.$touch()"
                  type="number"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="town"
                  :error-messages="townErrors"
                  label="Ville"
                  @input="$v.town.$touch()"
                  @blur="$v.town.$touch()"
                ></v-text-field>
              </v-flex>
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
          <v-btn color="green darken-1" flat @click="closeModal">Fermer</v-btn>
          <v-btn color="green darken-1" flat @click="addRestaurant">Ajouter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  numeric
} from "vuelidate/lib/validators";
import { eventBus } from "../main";

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    number: { required, numeric },
    street: { required },
    zipcode: { required, numeric, minLen: minLength(5), maxLen: maxLength(5) },
    town: { required },
    stars: { required },
    opinion: { required }
  },
  props: {
    dialog: Boolean,
    coordsNewRestaurant: Object
  },
  data: () => ({
    name: "",
    number: null,
    street: "",
    zipcode: null,
    town: "",
    stars: "",
    opinion: "",
    items: ["1⭐", "2⭐", "3⭐", "4⭐", "5⭐"]
  }),
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required &&
        errors.push("Merci de remplir le nom du restaurant.");
      return errors;
    },
    numberErrors() {
      const errors = [];
      if (!this.$v.number.$dirty) return errors;
      !this.$v.number.required &&
        errors.push("Merci d'indiquer le numéro dans la rue.");
      return errors;
    },
    streetErrors() {
      const errors = [];
      if (!this.$v.street.$dirty) return errors;
      !this.$v.street.required &&
        errors.push("Merci d'indiquer le nom de la rue.");
      return errors;
    },
    zipCodeErrors() {
      const errors = [];
      if (!this.$v.zipcode.$dirty) return errors;
      !this.$v.zipcode.maxLen &&
        errors.push("Le code postal doit être constitué de 5 chiffres.");
      !this.$v.zipcode.minLen &&
        errors.push("Le code postal doit être constitué de 5 chiffres.");
      !this.$v.zipcode.required &&
        errors.push("Merci d'indiquer le code postal.");
      return errors;
    },
    townErrors() {
      const errors = [];
      if (!this.$v.town.$dirty) return errors;
      !this.$v.town.required &&
        errors.push("Merci de fournir le nom de la ville.");
      return errors;
    },
    starsErrors() {
      const errors = [];
      if (!this.$v.stars.$dirty) return errors;
      !this.$v.stars.required && errors.push("Merci de donner une note");
      return errors;
    },
    opinionErrors() {
      const errors = [];
      if (!this.$v.opinion.$dirty) return errors;
      !this.$v.opinion.required && errors.push("Merci de donner votre avis");
      return errors;
    }
  },
  methods: {
    closeModal() {
      this.$v.$reset();
      this.name = "";
      this.number = null;
      this.street = "";
      this.zipcode = null;
      this.town = "";
      this.stars = "";
      this.opinion = "";
      this.$emit("modalClosed", false);
    },
    addRestaurant() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      let latitude = this.coordsNewRestaurant.lat;
      let longitude = this.coordsNewRestaurant.lng;
      let address = `${this.number} ${this.street}, ${this.zipcode} ${this.town}`;

      let newRestaurant = {
        restaurantName: this.name,
        address: address,
        lat: latitude,
        long: longitude,
        ratings: [
          {
            stars: Number(this.stars[0]),
            comment: this.opinion
          }
        ]
      };
      //Dispatch new created restaurant to list in store
      this.$store.dispatch("updateWithNewRestaurant", newRestaurant);
      //Reset form
      this.name = "";
      this.number = null;
      this.street = "";
      this.zipcode = null;
      this.town = "";
      this.stars = "";
      this.opinion = "";
      eventBus.$emit("newRestaurantAdded", null);
      this.$emit("modalClosed", false);
    }
  }
};
</script>
<style>
</style>