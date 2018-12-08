<template>
    <div>
        <hr>
        <h1>Profile page</h1>
        <p>{{getProfile}}</p>
        <br>
        <percent-tcc :historyArr='[{id:3, tcc:23,ccc:5}, {id:2, tcc:305,ccc:5}, {id:1, tcc:40,ccc:5}]' />
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import PercentTcc from './PercentTcc';
export default {
    created() {
        this.$store.dispatch('actionGetProfile');
    },
    computed: {
        ...mapGetters([
            'getProfile'
        ])
    },
    components: {
        'percent-tcc': PercentTcc
    }
}
</script>