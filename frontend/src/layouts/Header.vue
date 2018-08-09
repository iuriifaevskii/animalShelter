<template>
    <nav class="navbar is-transparent">
        <div class="navbar-brand">
            <div class="navbar-item">
                <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
            </div>
            <div class="navbar-burger burger" @click="showNav = !showNav" :class="{'is-active': showNav}" data-target="navbarExampleTransparentExample">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div id="navbarExampleTransparentExample" class="navbar-menu" :class="{'is-active': showNav}">
            <div class="navbar-start">
                <router-link active-class="active" class="navbar-item nav-link" to='/' exact>
                    Home
                </router-link>
                <template v-if="!authenticated">
                    <router-link active-class="active" class="navbar-item nav-link" to='/signin'>
                        Sign in
                    </router-link>
                    <router-link active-class="active" class="navbar-item nav-link" to='/signup'>
                        Sign up
                    </router-link>
                    <a class="button is-danger is-medium nav-link google-button" href='http://localhost:3000/auth/google'>Google Login</a>
                </template>
                <template v-else>
                    <router-link active-class="active" class="navbar-item nav-link" to='/profile'>
                        Profile
                    </router-link>
                    <router-link active-class="active" class="navbar-item nav-link" to='/signout'>
                        Sign out
                    </router-link>
                </template>
            </div>
        </div>
    </nav>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'authenticated'
        ])
    },
    data() {
        return {
            showNav: false
        }
    }
}
</script>

<style>
    .google-button {
        margin: auto 5px;
    }
</style>
