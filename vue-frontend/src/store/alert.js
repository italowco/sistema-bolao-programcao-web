import { Toast } from 'buefy/dist/components/toast'


export default {
  namespaced: true,
  state: {
    type: null,
    message: null
  },
  actions: {
    success({ dispatch, commit, state }, message) {
      commit('success', message);
      Toast.open({type: state.type, message: message})
      dispatch('modal/close', {} , {root: true})
    },
    error({ commit, state }, message) {
      commit('error', message);
      Toast.open({type: state.type, message: state.message})
    },
    clear({ commit }, message) {
      commit('success', message);
    }
  },
  mutations: {
    success(state, message) {
      state.type = 'is-success';
      state.message = message;
    },
    error(state, message) {
      state.type = 'is-danger';
      state.message = message;
    },
    clear(state) {
      state.type = null;
      state.message = null;
    }
  },
  getters: {
    getAlert(state){
      return state
    }
  }
}