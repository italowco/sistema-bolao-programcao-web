import { rodadaService} from "../services/rodada.service";
import {bilhetesService} from "../services/bilhetes.service";

export default {
  namespaced: true,
  state: {
    all: []
  },
  actions: {
    getAll({dispatch, commit}) {

      rodadaService.getRodadas()
        .then(
          teams => {
            commit('getAllSuccess', teams);

          },
          error => {
            //dispatch('alert/error', error, { root: true });
          }
        );
    },
    add({dispatch, commit}, rodada) {
      rodadaService.createRodada({rodada}).then(
        newRodada => {
          commit('createSuccess', newRodada)
        },
        error => {
        }
      )
    },
    edit({dispatch, commit}, rodada) {
      rodadaService.updateRodada( rodada ).then(
        updatedRodada => {
          dispatch('getAll')
          commit('updateRodada', updatedRodada)
          dispatch('alert/success', "Rodada " + updatedRodada.numero + "  atualizada." , { root: true });
        },
        error => {
          dispatch('alert/success', "Erro ao atualizar rodada. Tente novamente mais tarde." , { root: true });
        }
      )
    },
    delete({dispatch, commit}, rodadaId ) {
      rodadaService.deleteRodada(rodadaId).then(
        () => {
          dispatch('alert/success', "Rodada " + rodadaId + "  Foi deletada com sucesso." , { root: true });
          dispatch('getAll')
        }
      )
    }


  },
  mutations: {
    getAllSuccess(state, rodada) {
      state.all = rodada;
    },
    createSuccess(state, rodada) {
      state.all.push(rodada)
    },
    updateRodada(state, rodada) {
      state.all = state.all.map( r => {
        if(r.id == rodada.id){
          return Object.assign({}, r, rodada)
        }
        return r
      })
    }
  },
  getters: {
    getLast: (state) => {
      return state.all.last
    }
  }
}
