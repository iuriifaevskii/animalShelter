import * as axios from 'axios';
import {router} from '../main';

const state = {
    authenticated: !!localStorage.getItem('token'),
    error: ''
};

const getters = {
    authenticated: state => state.authenticated,
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
        return new Promise((resolve, reject) => {
            commit('unauthUser');
            localStorage.removeItem('token');
            resolve()
        })
    },
    actionSignup: ({commit}, payload) => {
        axios.post(`http://localhost:3000/signup`, payload)
            .then(response => {
                commit('authUser');
                localStorage.setItem('token', response.data.token);
                router.push({name: 'routerProfile'});
            })
            .catch((err) => commit('errorUser', 'Bad Login Info'));
    },
    isSignIn: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:3000/auth/checkToken`, {
                headers: {authorization: payload}
            })
                .then(response => {
                    if (response.data) {
                        commit('authUser');
                        localStorage.setItem('token', payload);
                        resolve(response.data);
                    } else {
                        commit('unauthUser');
                        commit('errorUser', 'Bad Login Info')
                        localStorage.removeItem('token');
                        reject(false);
                    }
                })
                .catch((err) => {
                    commit('unauthUser');
                    commit('errorUser', 'Bad Login Info')
                    localStorage.removeItem('token');
                    reject(false);
                });
            });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
