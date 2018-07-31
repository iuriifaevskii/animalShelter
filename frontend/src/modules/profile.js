import * as axios from 'axios';

const state = {
    profile: {}
};

const getters = {
    getProfile: state => state.profile
};

const mutations = {
    setProfile: (state, payload) => {
        state.profile = payload;
    }
};

const actions = {
    actionGetProfile: ({ commit }) => {
        axios.get(`http://localhost:3000/`, {
            headers: {authorization: localStorage.getItem('token')}
        })
        .then(response => {
            commit('setProfile', response.data);
        })
        .catch((err) => console.log(err));
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
