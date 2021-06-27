<template>
<b-container>
  <b-row class="vh-100 text-center" align-v="center">
    <b-col></b-col>
    <b-col>
        <div id="loginPage" class="w-100 p-3 mb-1">
            <b-form @submit="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
            >
                <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                <b-form-input 
                    v-model="form.password"
                    type="password" 
                    id="password" 
                    placeholder="****************"
                    aria-describedby="password-help-block">
                </b-form-input>
            </b-form-group>
                <br>
            <b-button type="submit" variant="primary">Login</b-button>
            <b-button variant="outline-primary" @click="$emit('registerClick')">Sign Up New User</b-button>
            <br>
            <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess"></GoogleLogin>
        </div>
    </b-col>
    <b-col></b-col>
  </b-row>

  
</b-container>
</template>

<script>
  import axios from "axios";
  import GoogleLogin from 'vue-google-login';

  const baseUrl = "https://kanbanbudi.herokuapp.com"

  export default {
    components: {
        GoogleLogin
    },
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        show: true,
        params: {
            client_id: "310016037294-nimqk0gl58rfh175tjle9vos5k3lupd9.apps.googleusercontent.com"
        },
        renderParams: {
            width: 500,
            height: 50,
            longtitle: true
        }
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()

        axios({
            method: "POST",
            url: baseUrl + "/users/login",
            data: {
                email: this.form.email,
                password: this.form.password
            }
        })
        .then(result => {
            // console.log(result)
            localStorage.setItem("access_token", result.data.access_token)
            this.$emit("checkAuth")
        })
        .catch(err => {
            console.log(err)
        })
      },
      onSuccess(googleUser) {
          // console.log(googleUser);

          // // This only gets the user information: id, name, imageUrl and email
          // console.log(googleUser.getBasicProfile());
          var id_token = googleUser.getAuthResponse().id_token;
          console.log("TOKEN", id_token)

          axios({
              method: "POST",
              url: baseUrl + "/users/login-google",
              data: {
                  token: id_token
              }
          })
          .then(respon => {
              localStorage.setItem("access_token", respon.data.access_token)
              this.$emit("checkAuth")
          })
      }
    }
  }
</script>