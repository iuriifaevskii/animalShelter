import Vue from 'vue';
import Vuex from 'vuex';

import * as signin from './modules/signin';

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
        signin
    }
});