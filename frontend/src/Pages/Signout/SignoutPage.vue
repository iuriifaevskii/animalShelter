<template>
    <div>
        <hr>
        <h1>Signout page</h1>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('actionSignout');
    }
}
</script>