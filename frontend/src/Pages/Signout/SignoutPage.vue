<template>
    <div>
        <hr>
        <h1>Signout page</h1>
    </div>
</template>

<script>
import {router} from '../../main'
export default {
    created() {
        this.$store.dispatch('actionSignout')
            .then(() => router.push({name: 'routerHome'}));
    }
}
</script>