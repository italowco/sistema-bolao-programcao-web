import { teamService } from "../services/teams.service";



export default {
  namespaced: true,
  state: {
    all: {}
  },
  actions: {
    getAll({ dispatch, commit }) {

      teamService.getTeams()
        .then(
          teams => {
            commit('getAllSuccess', teams);

          },
          error => {
            console.warn('Get teams fail', error)
            //dispatch('alert/error', error, { root: true });
          }
        );
    }
  },
  mutations: {
    getAllSuccess(state, teams) {
      state.all =  teams;
    }
  },
  getters: {}
}