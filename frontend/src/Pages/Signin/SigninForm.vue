<template>
    <form>
        <hr>
        <h1>Signin Form</h1>
        <div v-if="getError">{{getError}}</div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input 
                id="email"
                type="text"
                class="form-control"
                v-model.lazy="userData.email">
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input 
                id="password"
                type="password"
                class="form-control"
                v-model.lazy="userData.password">
        </div>
        <div class="form-group">
            <button
                class="btn btn-primary"
                @click.prevent="submit">
                    Signin
            </button>
        </div>
    </form>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            userData: {
                email: '',
                password: '',
            }
        }
    },
    computed: {
        ...mapGetters([
            'getError'
        ])
    },
    methods: {
        submit() {
            this.$store.dispatch('actionSignin', this.userData);
        }
    }
}
</script>
