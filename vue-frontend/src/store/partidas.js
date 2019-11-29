import { partidasService } from "../services/partidas.service";

export default {
  namespaced: true,
  state: {
    all: {}
  },
  actions: {
    getAll({ dispatch, commit }) {
      partidasService.getPartidas()
        .then(
          partidas => {
            commit('getAllSuccess', partidas);
          },
          error => {
            //dispatch('alert/error', error, { root: true });
          }
        );
    },
    byRodada({ dispatch, commit }, id) {
      partidasService.getPorRodada(id)
        .then(
          partidas => {
            commit('getAllSuccess', partidas);
          },
          error => {
            //dispatch('alert/error', error, { root: true });
          }
        );
    },
    add({dispatch, commit}, partida) {
      console.warn(partida)
      partidasService.createPartida(partida).then(
        partida => {

          commit('createSuccess', partida)
        },
        error => {
        }
      )
    },
    edit({dispatch, commit}, partida) {
      console.warn(partida)
      partidasService.updatePartida({partida}).then(
        success => {
          commit('editSuccess', partida)
          dispatch('getAll')
        },
        error => {
        }
      )
    },
    deletePartida({dispatch, commit}, partida ) {
      partidasService.deletePartida(partida.id).then(
        success => {
          commit('deleteSuccess', partida.id)
          dispatch('getAll')
        }
      )
    }
  },
  mutations: {
    getAllSuccess(state, partidas) {
      state.all = partidas.sort( (a,b) => a.id > b.id ? 1 : -1 );
    },
    createSuccess(state, partida) {
      state.all.push(partida)
    },
    editSuccess(state, partida) {
      state.all = partida
    },
    deleteSuccess(state, id ) {
      var index = state.all.findIndex(partida => partida.id == id)
      state.all.splice(index, 1)
    }
  },
  getters: {
    partidasProntas: (state) => (rodadaId) => {
      return state.all.filter( p => p.rodada_id == rodadaId ).sort( (a,b) => a.id > b.id ? 1 : -1 )
    }
  }
}