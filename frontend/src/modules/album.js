import * as axios from 'axios';

const state = {
    albums: [],
    pagination: {
        'current_page': 1
    },
    loading: false
};

const getters = {
    getAlbums: state => state.albums,
    getLoading: state => state.loading,
    getPagination: state => state.pagination
};

const mutations = {
    setAlbums: (state, payload) => {
        state.albums = payload;
    },
    setPagination: (state, payload) => {
        state.pagination = payload;
    },
    setLoading: (state, payload) => {
        state.loading = payload;
    }
};

const actions = {
    actionGetAlbums: ({ commit, state}, payload) => {
        const currentPage = state.pagination.current_page;

        commit('setLoading', true);
        axios.get(`http://localhost:3000/albums?page=${currentPage}`)
            .then(response => {
                commit('setAlbums', response.data.data);
                commit('setPagination', response.data.pagination);
            })
            .then(() => commit('setLoading', false))
            .catch((err) => {
                commit('setLoading', true);
                console.log(err);
            });
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
