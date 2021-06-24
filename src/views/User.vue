<template>
  <div>
    <div class="col-4 mx-auto my-4" id="login-block" v-if="!reg">
      <h1 class="text-3xl font-bold text-center">Log In</h1>
      <div class="text-md font-bold text-center text-red-700" id="login-error">{{errMsg}}</div>
      <form id="login-form" @submit.prevent="login">
        <div class="form-group">
          <label for="login-email">Email address</label>
          <input type="email" class="form-control" v-model="loginEmail" aria-describedby="emailHelp" placeholder="Email">
        </div>
        <div class="form-group">
          <label for="login-password">Password</label>
          <input type="password" class="form-control" v-model="loginPassword" placeholder="Password">
        </div> <br>
        <button type="submit" class="btn btn-primary">Login</button> <button type="button" class="btn btn-secondary" @click="registerForm">Register</button>
        <p>or login with</p>
        <div id="google-signin-button"></div>
      </form>
    </div>
    
    <div class="col-4 mx-auto my-4" id="reg-block" v-if="reg">
      <h1 class="text-3xl font-bold text-center">Register</h1>
      <div class="text-md font-bold text-center text-red-700" id="login-error">{{errMsg}}</div>
      <form id="login-form" @submit.prevent="register">
        <div class="form-group">
          <label>Email address</label>
          <input type="email" class="form-control" v-model="regEmail" aria-describedby="emailHelp" placeholder="Email">
        </div>
        <div class="form-group">
          <label>Alias</label>
          <input type="text" class="form-control" v-model="regAlias" aria-describedby="emailHelp" placeholder="Alias (optional)">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" class="form-control" v-model="regPassword" placeholder="Password">
          <label>Confirm Password</label>
          <input type="password" class="form-control" v-model="regPassword2" placeholder="Password">
        </div> <br>
        <button type="submit" class="btn btn-primary">Register</button> <button type="button" class="btn btn-secondary" @click="registerForm">back</button>
      </form>
    </div>
  </div>
</template>


<script>
import axios from "../util/axios"
export default {
    data(){
        return {
            loginEmail: "",
            loginPassword: "",
            regEmail: "",
            regPassword: "",
            regPassword2: "",
            errMsg: "",
            reg: false,
            regAlias: ""
        }
    },
    mounted() {
      gapi.signin2.render('google-signin-button', {
      onsuccess: this.gSignIn
      })
    },
    methods: {
        login(){
            let data = {
                email: this.loginEmail,
                password: this.loginPassword
            }
            axios.post("/login/",data)
            .then(res => {
                localStorage.access_token = res.data.access_token
                this.$emit("checkAuth")
            })
            .catch(err => {
                this.errMsg = err.response.data.message
            })
        },
        gSignIn (user) {
          const profile = user.getBasicProfile()
          var id_token = user.getAuthResponse().id_token
          axios.post('/glogin/',{idToken: id_token})
          .then(res => {
            localStorage.access_token = res.data.access_token
            console.log('google curse')
            this.$emit("checkAuth")
          })
          .catch(err => {
            console.error(err); 
          })
        },
        registerForm(){
          if (this.reg) {this.reg = false}
          else {this.reg = true}
          this.errMsg = null
        },
        register(){
          if (this.regPassword != this.regPassword2) {this.errMsg = "Password does not Match"}
          else {
            let data = {
              email: this.regEmail,
              password: this.regPassword,
              alias: this.regAlias
            }
            axios.post("/register/", data)
            .then(res => {
              this.registerForm()
            })
            .catch(err =>{
              this.errMsg = err.response.data.message
            })
          }
        }
    }
}
</script>

<style>

</style>