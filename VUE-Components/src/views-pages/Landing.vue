<template>
  <div>
      <!-- LOGIN STARTS -->
            <div v-if="currentPage === 'login'" id="login-section" class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-8">
        
                <div id="login-sub-section">
                    <img class="mx-auto h-40 w-auto" :src="logoYellow" alt="Kanban Logo">
                    <h2 class="mt-4 text-center text-3xl font-extrabold text-gray-900">
                        <span class="text-yellow-500">Log in</span><span class="text-gray-200"> to your account</span>
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-200">
                    Unregistered?
                    <a href="#" @click.prevent="currentPage = 'register'" id="register-link" class="font-medium text-yellow-500 hover:text-yellow-400">
                        Click here to register!
                    </a>
                    </p>
                </div>
        
                <form id="login-form" class="mt-8 space-y-6">
                    <input type="hidden" name="remember" value="true">
                    <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="login-email" class="sr-only">Email address</label>
                        <input v-model="loginEmail" id="login-email" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
                    </div>
                    <div>
                        <label for="login-password" class="sr-only">Password</label>
                        <input v-model="loginPassword" id="login-password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
                    </div>
                    </div>
            
            
                    <div>
                    <button @click.prevent="userLogin" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <!-- Heroicon name: solid/lock-closed -->
                        <svg class="h-5 w-5 text-yellow-600 group-hover:text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                        </span>
                        Sign in
                    </button>
                    </div>
                </form>
        
                <div id="login-oauth-section">
                    
                    <p class="mt-2 text-center font-bold text-sm text-yellow-500">
                    Or sign in with:
                    </p>
                </div>
                <div class="flex items-center justify-center">
                    <!-- <g-signin-button
                        :params="googleSignInParams"
                        @success="onSignInSuccess"
                        @error="onSignInError">
                        Sign in with Google
                    </g-signin-button> -->
                    <div class="g-signin2" data-onsuccess="onSignIn"></div>
                </div>
                <!-- <a href="#" onclick="signOut();">Sign out</a> -->
                </div>
            </div>
        <!-- LOGIN ENDS -->

        <!-- REGISTER STARTS -->
            <div v-if="currentPage === 'register'" id="register-section" class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-8">

                <div id="register-sub-section">
                    <img class="mx-auto h-40 w-auto" :src="logoPurple" alt="Kanban Logo">
                    <h2 class="mt-4 text-center text-3xl font-extrabold">
                    <span class="text-indigo-500">Create</span><span class="text-gray-200"> an account</span> 
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-200">
                    Already registered?
                    <a href="#" @click.prevent="currentPage = 'login'" id="login-link" class="font-medium text-indigo-400 hover:text-indigo-500">
                        Click here to login!
                    </a>
                    </p>
                </div>

                <form id="register-form" class="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" value="true">
                    <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="register-email" class="sr-only">Email address</label>
                        <input v-model="registerEmail" id="register-email" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
                    </div>
                    <div>
                        <label for="register-password" class="sr-only">Password</label>
                        <input v-model="registerPassword" id="register-password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
                    </div>
                    </div>
            
            
                    <div>
                    <button @click.prevent="userRegister" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <!-- Heroicon name: solid/lock-closed -->
                        <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                        </span>
                        Submit
                    </button>
                    </div>
                </form>

                </div>
            </div>
        <!-- REGISTER ENDS -->
        
  </div>
</template>

<script>
// import GSignInButton from 'vue-google-signin-button'

const axios = require('axios')
import logoYellow from '../img/Kanban-LogoYellow-05.png'
import logoPurple from '../img/Kanban-Logo-04.png'

export default {
    props: ['currentPageStatus'],
    data () {
        return {
            loginEmail: '',
            loginPassword: '',
            registerEmail: '',
            registerPassword: '',
            currentPage: this.currentPageStatus,
            logoYellow,
            logoPurple,
            // googleSignInParams: {
            //     client_id: '54580435784-6ultvvjbokrp8k1dk38ogs3dtdl5rr14.apps.googleusercontent.com'
            // },
            // GSignInButton
        }
    },
    methods: {
        userLogin () {
            axios.post('http://localhost:3000/users/login', {
                email: this.loginEmail,
                password: this.loginPassword
            })
            .then(response => {
                console.log(response)
                localStorage.setItem('accesstoken', response.data.accesstoken)
                this.$emit('ubahCurrentPage', 'homepage')
            })
            .catch(error => {
                console.log(error)
            })
        },
        userRegister () {
            axios.post('http://localhost:3000/users/register', {
                email: this.registerEmail,
                password: this.registerPassword
            })
            .then(response => {
                console.log('MASUK THEN - userRegister', response)
                this.$emit('ubahCurrentPage', 'login')
            })
            .catch(error => {
                console.log('MASUK CATCH - userRegister', error)
            })
        },
        onSignIn(googleUser) {
            console.log('MASUK GOOGLE SIGN IN AWAL')
            let google_access_token = googleUser.getAuthResponse().id_token;
            axios({
                method: 'POST',
                url: 'http://localhost:3000/users/googleLogin',
                headers: {google_access_token}
            })
            .then(response => {
                console.log('MASUK THEN - userRegister', response)
                localStorage.setItem('accesstoken', response.accesstoken)
                this.$emit('ubahCurrentPage', 'homepage')
            })
            .catch(err => {
                console.log(err)
            })
        },
        // onSignInSuccess (googleUser) {
        // let google_access_token = googleUser.getAuthResponse().id_token
        //     axios({
        //         method: 'POST',
        //         url: 'http://localhost:3000/users/googleLogin',
        //         headers: {google_access_token}
        //     })
        //     .then(response => {
        //         console.log('MASUK THEN - userRegister', response)
        //         localStorage.setItem('accesstoken', response.accesstoken)
        //         this.$emit('ubahCurrentPage', 'homepage')
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // },
        // onSignInError (error) {
        //     console.log('OH TIDAK', error)
        // }
    }  
}
</script>

<style scoped>
/* .g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
} */
</style>