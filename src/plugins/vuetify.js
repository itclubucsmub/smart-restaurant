import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

// Helpers
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#F59241', // #E53935
    secondary: '#C27432', // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})