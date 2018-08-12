import * as axios from 'axios';

const state = {
    albums: [],
    loading: false
};

const getters = {
    getAlbums: state => state.albums,
    getLoading: state => state.loading
};

const mutations = {
    setAlbums: (state, payload) => {
        state.albums = payload;
    },
    setLoading: (state, payload) => {
        state.loading = payload;
    }
};

const actions = {
    actionGetAlbums: ({ commit }) => {
        commit('setLoading', true);
        axios.get(`http://localhost:3000/albums`)
            .then(response => {
                commit('setAlbums', response.data);
            })
            .then(() => commit('setLoading', false))
            .catch((err) => {
                commit('setLoading', true);
                console.log(err)
            });
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
