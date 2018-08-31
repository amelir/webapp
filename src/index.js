import App from './App';
import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import 'components/global.scss';

// Import views from other modules
import { AccountDashboard } from 'account';
import LoginRoute, { Login, Register } from 'login';

// Init router
Vue.use(Router);

const routes = [
  { path: '/account', component: AccountDashboard, name: 'account_settings' },
  { path: '/login', component: LoginRoute, children: [
    {
      path: '',
      component: Login,
      name: 'account_login'
    },
    {
      path: 'register',
      component: Register,
      name: 'account_register'
    }
  ]},
];

const router = new Router({
  mode: 'history',
  routes
});

// Init store
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    user: {
      email: ''
    }
  },

  mutations: {
    accountLogin(state, payload){
      state.user.email = payload.email || '';
    }
  }
});

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});