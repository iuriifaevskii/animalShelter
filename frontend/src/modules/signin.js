import * as axios from 'axios';
import {router} from '../main';

const state = {
    authenticated: false,
    error: ''
};

const getters = {
    authenticated: state => state.authenticated,
    getError: state => state.error
};

const mutations = {
    authUser: (state, payload) => {
        state.authenticated = true;
    },
    unauthUser: (state, payload) => {
        state.authenticated = false;
    },
    errorUser: (state, payload) => {
        state.error = payload;
    }
};

const actions = {
    actionSignin: ({ commit }, payload) => {
        axios.post(`http://localhost:3000/signin`, payload)
            .then(response => {
                commit('authUser', response);

                localStorage.setItem('token', response.data.token)
                router.push({name: 'routerProfile'});
            })
            .catch((err) => {
                commit('errorUser', 'Bad Login Info');
            });
    },
    actionSignout: ({commit}) => {
        commit('unauthUser');
        localStorage.removeItem('token');
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
