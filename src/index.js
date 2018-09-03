import App from './App';
import axios from 'axios';
import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import 'components/global.scss';

// Import views from other modules
import Account, { AccountDashboard, AccountSecurity } from 'account';
import LoginRoute, { Login, Register } from 'login';

// Init router
Vue.use(Router);

const routes = [
  { path: '/account', component: Account, children: [
    {
      path: '',
      component: AccountDashboard,
      name: 'account_settings'
    },
    {
      path: 'billing',
      name: 'account_billing'
    },
    {
      path: 'data',
      name: 'account_data'
    },
    {
      path: 'personalize',
      name: 'account_personalize'
    },
    {
      path: 'security',
      component: AccountSecurity,
      name: 'account_security'
    }
  ]},
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

// Init API
Vue.use({
  install(Vue){
    const api = axios.create({
      baseURL: '/api'
    });

    // Add authroization header
    api.interceptors.request.use(config => {
      if(!config.headers.authorization && !config.headers.Authorization){
        if(localStorage.authToken){
          config.headers.Authorization = `Bearer ${localStorage.authToken}`;
        }
      }

      return config;
    });

    Vue.prototype.$api = api;
  }
});

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});