import Vue from 'vue'
import App from './App'
import Buefy from 'buefy'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'

const moment = require("moment")
require('moment/locale/pt-br')
Vue.use(require("vue-moment"), { moment })

Vue.use(Buefy, {
  defaultDateFormatter: date => {
    return moment(date).format("DD/MM/YYYY");
  },
  defaultMonthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ],
  defaultDayNames: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  defaultIconPack: "fas"
})
Vue.use(VueAxios, axios)
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
