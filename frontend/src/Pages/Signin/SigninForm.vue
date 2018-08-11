<template>
<div class="container center-align">
    <el-form :model="signInForm" status-icon :rules="rules" ref="signInForm" label-width="120px" class="signInFormClass">
        <h1 class="title">Sign in form</h1>
        <el-form-item label="Email" prop="email">
            <el-input v-model="signInForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="signInForm.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button class="button-width" type="primary" @click="submit(signInForm)">Sign In</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    data() {
        return {
            signInForm: {
                email: '',
                password: '',
            },
            rules: {
                email: [
                    { required: true, message: 'Please input email address', trigger: 'blur' },
                    { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                ],
                password: [
                    { required: true, message: 'Please input password', trigger: 'blur' },
                    { min: 6, max: 25, message: 'Length should be 6 to 20', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapGetters([
            'getError'
        ])
    },
    methods: {
        submit(signInForm) {
            this.$store.dispatch('actionSignin', signInForm);
        }
    }
}
</script>

<style>
    .center-align {
        width: 75%;
        padding: 20px;
        margin: 20px auto;
        text-align: center;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    }
    .button-width {
        width: 100%;
    }
    @media screen and (min-width: 1088px) {
        .center-align {
            width: 40%;
        }
    }
</style>
