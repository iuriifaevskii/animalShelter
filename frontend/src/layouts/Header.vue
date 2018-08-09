<template>
    <ul class="nav nav-pills">{{authenticated}}
        <router-link tag='li' active-class="active" class="nav-link" to='/' exact>Home</router-link>
        <template v-if="!authenticated">
            <router-link tag='li' active-class="active" class="nav-link" to='/signin'>Sign in</router-link>
            <router-link tag='li' active-class="active" class="nav-link" to='/signup'>Sign up</router-link>
        </template>
        <template v-else>
            <router-link tag='li' active-class="active" class="nav-link" to='/profile'>Profile</router-link>
            <router-link tag='li' active-class="active" class="nav-link" to='/signout'>Sign out</router-link>
        </template>
        <hr>
        <a href='http://localhost:3000/auth/google'>Google Login</a>
    </ul>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'authenticated'
        ])
    }
}
</script>
