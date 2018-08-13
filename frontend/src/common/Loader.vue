<template>
</template>

<script>
    export default {
        name: 'as-loader',
        props: {
            loading: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            loading: {
                immediate: true,
                handler(newVal, oldVal) {
                    this.$nextTick(() => {
                        this.$loading({ fullscreen: true }).close();
                    });
                }
            }
        },
        created() {
            if (this.loading) {
                this.$loading({ fullscreen: true });
            }
        }
    }
</script>