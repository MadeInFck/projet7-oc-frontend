import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'
import fr from 'vuetify/es5/locale/fr'
import 'vuetify/src/styles/main.sass'

Vue.use(Vuetify);
export default new Vuetify({
  icons: {
    iconfont: 'mdi',  // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
  },
  theme: {
    dark: false,
  },
  lang: {
    locales: { fr },
    current: 'fr'
  },
});
