import { authService } from "../services/auth.service";


const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? user
    : { status: { loggedIn: false }, user: null };


export default {
    namespaced: true,
    state: initialState,
    actions: {
        login({ dispatch, commit }, { username, password }) {
            commit('loginRequest', { username });
            authService.login(username, password)
              .then(
                user => {
                  if(user.error) {
                    dispatch('alert/error', "Usuário ou senha incorretors.", { root: true });
                  } else {
                    localStorage.setItem('user', JSON.stringify({ status: {loggedIn: true}, user}));
                    commit('loginSuccess', { status: {loggedIn: true}, user});
                    dispatch('alert/success', "Seja bem vindo " + user.name + "!", { root: true });
                  }
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', "Estamos com problemas internos, entre em contato com o admnistrador.", { root: true });

                }
              );
        },
        logout({commit}) {
          localStorage.removeItem('user')
          commit('logout');
        },
        getUser( {commit} ) {
          var user = JSON.parse(localStorage.getItem('user'));
          commit('loginSuccess', user )
        },
        checkAuth( { dispatch, commit, state } ) {
          console.warn("CHECK AUTH")
          authService.checkAuth(state.user.token)
            .then(
              user => {
                if(user.error) {
                  dispatch('alert/error', "Usuário ou senha incorretors.", { root: true });
                } else {
                  localStorage.setItem('user', JSON.stringify({ status: {loggedIn: true}, user}));
                  commit('loginSuccess', { status: {loggedIn: true}, user});
                  dispatch('alert/success', "Seja bem vindo " + user.name + "!", { root: true });
                }
              },
              error => {
                commit('loginFailure', error);
                dispatch('alert/error', "Estamos com problemas internos, entre em contato com o admnistrador.", { root: true });

              }
            );
        }

    },
    mutations: {
      loginRequest(state, user) {
        state = { status: {loggedIn: true}, user };
      },
      loginSuccess(state, user) {
        state = { status: {loggedIn: true}, user };
      },
      loginFailure(state) {
        state = { status: {loggedIn: false}, user: null};
      },
      logout(state) {
        state = { status: {loggedIn: false}, user: null}
      }
    },
    getters: {
      getUser: (state) => {
        return state
      },
      isAdmin: (state) => {
        if (state.user != null){
          return state.user.profile > 1
        } else {
        return false
        }
      }
    }
}
