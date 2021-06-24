<template>
    <!-- START LOGIN -->
    <div class="column is-half">        
        <form @submit.prevent="login" class="box">
            <div class=" has-text-centered is-size-3 is-family-sans-serif has-text-weight-bold">
                <p class="subtitle has-text-danger" v-text="loginState.loginMessage"></p>
                <h1>Login</h1>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input v-model="formLogin.email" class="input" type="email" placeholder="Email"/>
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input v-model="formLogin.password" class="input" type="password" placeholder="Password" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field is-grouped">
                <p class="control">
                    <button type="submit" class="button is-success"> Login </button>
                    <button @click.prevent="$emit('registerClick')" class="button"> Register </button>
                </p>
            </div>
            <div class="field is-grouped">
                <p class="control has-text-centered is-family-sans-serif is-size-6">
                    --OR--
                </p>
            </div>
            <div class="field is-grouped">
                <p class="control">
                    <GoogleLogin 
                        :params="params"
                        :renderParams="renderParams"
                        :onSuccess="googleSignIn"
                    ></GoogleLogin>
                </p>
            </div>
        </form>
    </div>
    <!-- END LOGIN -->
</template>

<script>
import axios from "../utils/server-helper.js"
import GoogleLogin from "vue-google-login"

export default {
    name: "Login",
    components: { GoogleLogin },
    data() {
        return {
            formLogin: {
                email: "",
                password: ""
            },
            loginState: {
                loginMessage: "",
                registerMessage: "",
                isRegister: false
            },
            params: {
                client_id: '265426479351-kdh0fa6ll05bssj1t6kvaa3of7qhrg8q.apps.googleusercontent.com'
            },
            renderParams: {
                width: 170,
                height: 30,
                longtitle: true
            }
        }
    },
    methods: {
        emptyForm() {
            this.formLogin.email = ""
            this.formLogin.password = ""            
        },
        googleSignIn(googleuser) {
            axios({
                method: 'POST',
                url: '/users/google-login',
                data: {
                    google_token: googleuser.getAuthResponse().id_token
                }
            })
            .then(res => {
                const { data } = res.data
                localStorage.setItem("access_token", data.access_token)
                this.emptyForm()
                this.$emit('LoggedIn', true)
            })
            .catch(err => {
                const { error } = err.response.data
                this.emptyForm()
                this.loginState.loginMessage = error.message
            })
        },
        login() {
            axios({
                method: 'POST',
                url: '/users/login',
                data: {
                    email: this.formLogin.email,
                    password: this.formLogin.password
                }
            })
            .then(res => {
                const { data } = res.data
                localStorage.setItem("access_token", data.access_token)
                this.emptyForm()
                this.$emit('LoggedIn', true)
            })
            .catch(err => {
                const { error } = err.response.data
                this.emptyForm()
                this.loginState.loginMessage = error.message
            })
        },
    }
};
</script>

<style>
</style>