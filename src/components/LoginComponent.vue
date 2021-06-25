<template>
<b-container>
  <b-row class="vh-100 text-center" align-v="center">
    <b-col></b-col>
    <b-col>
        <div id="loginPage" class="w-100 p-3 mb-1">
            <b-form @submit="onSubmit" @reset="onReset">
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
            <b-button variant="outline-primary">Sign Up New User</b-button>
        </div>
    </b-col>
    <b-col></b-col>
  </b-row>

  
</b-container>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()

        axios({
            method: "POST",
            url: "http://localhost:3000/users/login",
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
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
        this.show = false
      }
    }
  }
</script>