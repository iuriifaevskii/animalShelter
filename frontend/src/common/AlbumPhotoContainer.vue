<template>
    <div v-if="isPublished" class="image-container-style">
        <div><img :src="filename" :alt="name" class="image"></div>
    </div>
</template>

<script>
export default {
    name: 'album-photo-container',
    props: {
        name: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        filename: {
            type: String,
            default: ''
        },
        views: {
            type: Number,
            default: 1
        },
        isPublished: {
            type: Boolean,
            default: false
        },
        author: {
            type: String,
            default: ''
        },
        metadata: {
            type: Object,
            default: null
        }
    }
}
</script>

<style>
    .image-container-style {
        width: 50%;
    }
</style>