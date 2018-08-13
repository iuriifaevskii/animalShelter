<template>
    <div class="container">
        <h1 class="title has-text-centered">All Albums</h1>
        <as-loader :loading="getLoading"></as-loader>
        <template v-if="!getLoading">
            <div class="columns" :key="i" v-for="i in Math.ceil(getAlbums.length / 3)">
                <div class="column" :key="item.id" v-for="item in getAlbums.slice((i - 1) * 3, i * 3)">
                    <as-album-card
                        :name="item.name" 
                        :photos="item.photos"/>
                </div>
            </div>
            <as-pagination-component v-if="getPagination.last_page > 1" :pagination="getPagination" :offset="5" @paginate="fetchAlbomsForPagination"></as-pagination-component>
        </template>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    created() {
        this.$store.dispatch('actionGetAlbums');
    },
    computed: {
        ...mapGetters([
            'getAlbums',
            'getLoading',
            'getPagination'
        ])
    },
    methods: {
        fetchAlbomsForPagination() {
            this.$store.dispatch('actionGetAlbums');
        }
    }
}
</script>