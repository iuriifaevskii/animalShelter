import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import profile from './modules/profile';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth,
        profile
    }
});