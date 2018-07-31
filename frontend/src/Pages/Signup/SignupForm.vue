<template>
    <form>
        <hr>
        <h1>Signup Form</h1>
        <div v-if="getError">Oops! {{getError}}</div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input 
                id="email"
                type="text"
                ref="email"
                class="form-control"
                v-model.trim="$v.userData.email.$model">
        </div>
        <div class="error" v-if="!$v.userData.email.required">Field is required.</div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input 
                id="password"
                type="password"
                class="form-control"
                v-model.trim="$v.userData.password.$model">
        </div>
        <div class="error" v-if="!$v.userData.password.required">Field is required.</div>
        <div v-if="$v.userData.password.$model!==$v.userData.passwordConfirm.$model">Passwords must match</div>
        <div class="form-group">
            <label for="passwordConfirm">Confirm password:</label>
            <input 
                id="passwordConfirm"
                type="password"
                class="form-control"
                v-model.trim="$v.userData.passwordConfirm.$model">
        </div>
        <div class="error" v-if="!$v.userData.passwordConfirm.required">Field is required.</div>
        <div class="form-group">
            <button
                class="btn btn-primary"
                @click.prevent="submit">
                    Sign up
            </button>
        </div>
    </form>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            userData: {
                email: '',
                password: '',
                passwordConfirm: ''
            }
        }
    },
    validations: {
        userData: {
            email: {
                required
            },
            password: {
                required
            },
            passwordConfirm: {
                required
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
            this.$store.dispatch('actionSignup', {
                email: this.userData.email,
                password: this.userData.password
            });
        }
    }
}
</script>
