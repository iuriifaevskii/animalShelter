<template>
    <el-card class="card-style" :body-style="{ padding: '0px' }">
        <div class="images-wrapper">
            <album-photo-container
                v-for="photo in photos"
                :key="photo.id"
                :name="photo.name"
                :description="photo.description"
                :filename="photo.filename"
                :views="photo.views"
                :isPublished="photo.isPublished"
                :author="photo.author ? photo.author.name : null"
                :metadata="photo.metadata">
            </album-photo-container>
        </div>
        <div class="bottom-container">
            <span>{{name}}</span>
            <div class="bottom clearfix">
                <el-button type="text">Read more...</el-button>
            </div>
        </div>
    </el-card>
</template>

<script>
import AlbumPhotoContainer from './AlbumPhotoContainer';
export default {
    name: 'as-album-card',
    data() {
        return {
        }
    },
    props: {
        name: {
            type: String,
            required: true
        },
        photos: {
            type: Array,
            default: []
        }
    },
    components: {
        'album-photo-container': AlbumPhotoContainer
    }
}
</script>

<style>
    .time {
      font-size: 13px;
      color: #999;
    }
    
    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: right;
    }

    .image {
      width: 100%;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    
    .clearfix:after {
        clear: both
    }
    .images-wrapper {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
    }
    .wrapper > * {
        flex: 1 100%;
    }

    .card-style {
        height: 100%;
    }

    .el-card__body {
        padding: 0px;
        display: flex;
        flex-flow: row wrap;
        height: 100%;
    }

    .bottom-container {
        padding: 14px;
        width: 100%;
        align-self: flex-end;
    }
</style>