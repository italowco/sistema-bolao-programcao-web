import { bilhetesService } from "../services/bilhetes.service";



export default {
  namespaced: true,
  state: {
    all: []
  },
  actions: {
    getAll({ commit }) {
      bilhetesService.getBilhetes()
        .then(
          bilhetes => {
            commit('getAllSuccess', bilhetes);
          },
          error => {
                      }
        );
    },
    byRodada({ commit }, id) {
      bilhetesService.getBilhetesPorRodada(id)
          .then(
              bilhetes => {
                console.warn(bilhetes)
                commit('getAllSuccess', bilhetes);

              },
              error => {
              }
          );
    },
    add({commit}, bilhete) {
      bilhetesService.createBilhete(bilhete).then(
        bilhete => {
          commit('createSuccess', bilhete)
          return bilhete
        },
        error => {
          return error
        }
      )
    },
    edit({commit}, partida) {
      bilhetesService.createRodada({partida}).then(
        () => {
          commit('editSuccess', partida)
        },
        error => {
        }
      )
    },
    deleteBilhete({dispatch, commit}, bilhete ) {
      bilhetesService.deleteBilhete(bilhete).then(
        () => {
          commit('deleteSuccess', bilhete)
          commit('getAllSuccess')
        }
      )
    }
  },
  mutations: {
    getAllSuccess(state, bilhetes) {
      state.all = bilhetes;
    },
    createSuccess(state, bilhete) {
      state.all.push(bilhete)
    },
    editSuccess(state, partida) {
      state.all = partida
    },
    deleteSuccess(state, id ) {
      state.all = state.all.filter(p => p.id != id)
    }
  },
  getters: {
    bilhetesDaRodada: (state) => (rodadaId) => {
      return  state.all.filter( p => p.rodada_id == rodadaId )
    },
    numeroBilhetesPorRodada: (state) => (rodadaId) => {
      return  state.all.filter( p => p.rodada_id == rodadaId ).length
    }
  }
}
