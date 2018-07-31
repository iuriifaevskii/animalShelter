<template>
    <div>
        <hr>
        <h1>Home page</h1>
        <p>this is home page</p>
        test data:
        {{getProfile}}
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