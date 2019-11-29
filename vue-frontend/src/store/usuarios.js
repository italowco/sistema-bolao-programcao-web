import { authService } from "../services/auth.service";
import {Toast} from "buefy/dist/components/toast/index";

const initialState = {}

export default {
    namespaced: true,
    state: {
        all:[]
    },
    actions: {
        getAll ({commit}) {
            authService.getAllUsers().then(
                (usuarios) => {
                    console.warn(usuarios)
                    commit('getAllSuccess', usuarios)
                },
                (error) => {
                    console.warn(error)
                }
            )
        },
        deleteUser({commit, dispatch}, id) {
            authService.deleteUser(id).then(
                (success) => {
                    commit('deleteSuccess', id)
                    dispatch('alert/success', "Usuário deletado com sucesso.", { root: true });
                },
                (error) => {
                    console.warn(error)
                }
            )
        },
        createUser({commit, dispatch}, user) {
            authService.createUser(user).then(
                (success) => {
                    commit('createSuccess', success)
                    dispatch('alert/success', "Usuário deletado com sucesso.", { root: true });
                },
                (error) => {
                    console.warn(error)
                    dispatch('alert/error', "Nâo foi possivel deletar, estamos com problemas internos", { root: true });
                }
            )
        },
        updateUser({commit, dispatch}, user) {
            authService.updateUser(user).then(
                (user) => {
                    dispatch('alert/success', "Usuário atualizado com sucesso.", { root: true });
                },
                (error) => {
                    dispatch('alert/error', "Nâo foi possivel atualizar, estamos com problemas internos", { root: true });
                }
            )
        }
    },
    mutations: {
        getAllSuccess(state, payload) {
            state.all = payload
        },
        deleteSuccess(state, id) {
            const index = state.all.findIndex( u => u.id == id)
            state.all.splice(index, 1)
        },
        createSuccess(state, user) {
            state.all.push(user)
        }
    },
    getters: {

    }
}