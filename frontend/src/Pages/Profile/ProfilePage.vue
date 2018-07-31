<template>
    <div>
        <hr>
        <h1>Profile page</h1>
        <p>{{getProfile}}</p>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    created() {
        this.$store.dispatch('actionGetProfile');
    },
    computed: {
        ...mapGetters([
            'getProfile'
        ])
    },
}
</script>