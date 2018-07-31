import * as axios from 'axios';
import {router} from '../main';

const state = {
    authenticated: localStorage.getItem('token'),
    error: ''
};

const getters = {
    authenticated: state => !!state.authenticated,
    getError: state => state.error
};

const mutations = {
    authUser: (state) => {
        state.authenticated = true;
        state.error = '';
    },
    unauthUser: (state) => {
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
                commit('authUser');

                localStorage.setItem('token', response.data.token)
                router.push({name: 'routerProfile'});
            })
            .catch((err) => commit('errorUser', 'Bad Login Info'));
    },
    actionSignout: ({commit}) => {
        commit('unauthUser');
        localStorage.removeItem('token');
    },
    actionSignup: ({commit}, payload) => {
        console.log(payload)
        axios.post(`http://localhost:3000/signup`, payload)
            .then(response => {
                commit('authUser');
                localStorage.setItem('token', response.data.token);
                router.push({name: 'routerProfile'});
            })
            .catch((err) => commit('errorUser', 'Bad Login Info'));
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
