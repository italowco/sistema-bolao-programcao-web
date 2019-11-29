import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Report from './views/Report'
import AddReport from './views/AddReport'
import Login from './views/Login'
import Apostas from './views/Apostas'
import store from './store'
import Usuarios from './views/Usuarios'
import Vendas from './views/Vendas'
import MinhasVendas from './views/MInhasVendas'

Vue.use(Router)


let entryUrl = null;

const guard = async (to, from, next) => {

  if (store.state.auth.status.loggedIn) {
    if (entryUrl) {
      const url = entryUrl;
      entryUrl = null;
      return next(url); // goto stored url
    } else {
      return next(); // all is fine
    }
  }
  if (store.state.auth.user != null) {
    await store.dispatch('auth/checkAuth');
  }

  // we use await as this async request has to finish
  // before we can be sure

  if (store.state.auth.loggedIn) {
    next();
  } else {
    entryUrl = to.path; // store entry url before redirect
    next('/');
  }
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'apostas',
      component: Apostas
    },
    {
       path: `/Login`,
       name: 'login',
       component: Login
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/rodadas',
      name: 'rodadas',
      beforeEnter: guard,
      component: Report
    },
    {
        path: '/minhas-vendas',
        name: 'minhas-vendas',
        beforeEnter: guard,
        component: MinhasVendas
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      beforeEnter: guard,
      component: Usuarios
    },
    {
        path: '/vendas',
        name: 'vendas',
        beforeEnter: guard,
        component: Vendas
    },
    {
      path: '/add-report',
      name: 'addReport',
      component: AddReport
    },

  ],
  linkActiveClass: "is-active",
  linkExactActiveClass: "is-active"
})

