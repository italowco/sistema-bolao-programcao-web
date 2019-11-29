import Vue from 'vue'
import Vuex from 'vuex'
import teams from './teams'
import auth from './auth'
import rodada from './rodada'
import partidas from './partidas'
import bilhetes from './bilhetes'
import apostas from './apostas'
import alert from './alert'
import usuarios from './usuarios'
import modal from './modal'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    teams,
    rodada,
    partidas,
    bilhetes,
    apostas,
    alert,
    modal,
    usuarios
  }
})
