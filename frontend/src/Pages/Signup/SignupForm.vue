<template>
<div class="container center-align">
    <el-form :model="signUpForm" status-icon :rules="rules" ref="signUpForm" label-width="120px" class="signUpFormClass">
        <h1 class="title">Sign up form</h1>
        <div class="error" v-if="getError">Oops! {{getError}}</div>
        <el-form-item label="Email" prop="email">
            <el-input v-model="signUpForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="pass">
            <el-input type="password" v-model="signUpForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
            <el-input type="password" v-model="signUpForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button class="button-width" type="primary" @click="submit(signUpForm)">Sign Up</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please input the password'));
            } else {
                if (this.signUpForm.checkPass !== '') {
                    this.$refs.signUpForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please input the password again'));
            } else if (value !== this.signUpForm.pass) {
                callback(new Error('Two inputs don\'t match!'));
            } else {
                callback();
            }
        };
        return {
            signUpForm: {
                email: '',
                pass: '',
                checkPass: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: 'Please input email address', trigger: 'blur' },
                    { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
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
        submit(signUpForm) {
            this.$refs['signUpForm'].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('actionSignup', {
                        email: signUpForm.email,
                        password: signUpForm.pass
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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
    .error {
        color: red;
        font-weight: 500;
        margin: 7px;
    }
    @media screen and (min-width: 1088px) {
        .center-align {
            width: 40%;
        }
    }
</style>
