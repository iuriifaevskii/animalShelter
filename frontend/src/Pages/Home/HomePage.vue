<template>
    <div class="container">
        <h1 class="title has-text-centered">All Albums</h1>
        <template v-if="getLoading">Loading...</template>
        <div v-else class="columns" :key="i" v-for="i in Math.ceil(getAlbums.length / 3)">
            <div class="column" :key="item.id" v-for="item in getAlbums.slice((i - 1) * 3, i * 3)">
                <as-album-card
                    :name="item.name" 
                    :photos="item.photos"/>
            </div>
        </div>
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
            'getLoading'
        ])
    }
}
</script>