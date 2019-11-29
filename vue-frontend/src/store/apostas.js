import { apostasService } from "../services/apostas.service";
import {bilhetesService} from "../services/bilhetes.service";



export default {
    namespaced: true,
    state: {
        all: []
    },
    actions: {
        getAll({ commit }) {
            apostasService.getAllApostasFolhas()
                .then(
                    apostas => {
                        commit('getAllSuccess', apostas);
                        commit('sortBilhetes')
                    },
                    error => {
                    }
                );
        },
        byRodada({ commit }, id) {
            apostasService.getApostasFolhas(id)
                .then(
                    apostas => {
                        commit('getAllSuccess', apostas);
                        commit('sortBilhetes')

                    },
                    error => {
                    }
                );
        },
        add({commit}, aposta) {
            return apostasService.createApostaFolha(aposta).then(
                aposta => {
                    commit('createSuccess', aposta)
                    return aposta
                },
                error => {
                    return error
                }
            )
        },
        edit({commit}, partida) {
            apostasService.createRodada({partida}).then(
                () => {
                    commit('editSuccess', partida)
                },
                error => {
                }
            )
        },
        deleteAposta({dispatch, commit}, aposta ) {
            apostasService.deleteAposta(aposta.id).then(
                (success) => {
                    commit('deleteSuccess', aposta.id)
                    dispatch('byRodada', aposta.rodada_id)
                })
        },
        createApostaEBilhete({dispatch}, payload){

            dispatch('add', payload.aposta).then(
                (aposta) => {
                    payload.bilhetes.forEach(  (b) => {
                        b.aposta_folha_id = aposta.id
                         dispatch('bilhetes/add', b, {root: true})
                    })
                }
            )
            dispatch('byRodada', payload.aposta.rodada_id)
        },
        deleteBilhete({dispatch, commit}, aposta ) {
          apostasService.deleteAposta(aposta).then(
            () => {
              commit('deleteSuccess', aposta)
            }
          )
        }
    },
    mutations: {
        getAllSuccess(state, apostas) {
          state.all = apostas
        },
        createSuccess(state, aposta) {
            state.all.push(aposta)
        },
        editSuccess(state, partida) {
            state.all = partida
        },
        deleteSuccess(state, id ) {
            state.all = state.all.filter(p => p.id != id)
        },
        sortBilhetes(state) {
          console.warn(state)
          const apostas = this.state.apostas.all
          apostas.forEach( (aposta) => {
            aposta.bilhetes = aposta.bilhetes.sort((a,b) => {
              let comp = 0
              if(a.partida.id > b.partida.id){
                comp = 1
              } else if (a.partida.id < b.partida.id) {
                comp = -1
              }
              return comp
            })
          })
          state.all = apostas
        }

    },
    getters: {
        apostasDaRodada: (state) => (rodadaId) => {
            return  state.all.filter( p => p.rodada_id == rodadaId )
        },
        numeroApostasPorRodada: (state) => (rodadaId) => {
            return  state.all.filter( p => p.rodada_id == rodadaId ).length
        }
    }
}
