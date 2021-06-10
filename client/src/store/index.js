import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')): {
    token: '',
    user_id: 0,
    username: '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserId(state, user_id) {
      state.user_id = user_id;
    },
    setUsername(state, username) {
      state.username = username;
    }
  },
  getters: {
    getToken: state => {
      return state.token;
    },
    getUserId: state => {
      return state.user_id;
    },
    getUsername: state => {
      return state.username;
    }
  },
  actions: {},
  modules: {},
});

export default store
