export default {
  namespaced: true,
  state: {
    loginModal: false,
    loading: false,
      
  },
  actions: {
    open({ commit }, message) {
      commit('open', message);

    },
    close({ commit }, message) {
      commit('close', message);
    },
    clear({ commit }, message) {
      commit('success', message);
    }
  },
  mutations: {
    close(state, message) {
      state.loginModal = false;
      state.message = message;
    },
    open(state, message) {
      state.loginModal = true;
      state.message = message;
    }
  }
}