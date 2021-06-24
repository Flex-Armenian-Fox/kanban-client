<template>
    <div class="column is-half">
        <form @submit.prevent="register" class="box">
            <div class="has-text-centered is-size-3 is-family-sans-serif has-text-weight-bold">
                <p class="subtitle has-text-danger" v-text="registerMessage" ></p>
                <h1>Register New User</h1>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" v-model="formRegister.email" type="email" placeholder="Email"/>
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" v-model="formRegister.password" type="password" placeholder="Password" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" v-model="formRegister.fullname" type="text" placeholder="Full Name" />
                    <span class="icon is-small is-left">
                        <i class="fas fa-address-card"></i>
                    </span>
                </p>
            </div>
            <div class="field is-grouped">
                <p class="control">
                    <button type="submit" class="button is-success" v-bind:class="{ 'is-loading': submitted }">
                        Register
                    </button>
                    <button @click.prevent="$emit('cancelRegister')" class="button is-danger">
                        Cancel
                    </button>
                </p>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "../utils/server-helper.js"

export default {
    name: "Register",
    data() {
        return {
            formRegister: {
                email: "",
                password: "",
                fullname: ""
            },
            submitted: false,
            registerMessage: ""
        }
    },
    methods: {
        register() {
            this.submitted = true
            axios({
                method: 'POST',
                url: '/users/register',
                data: {
                    email: this.formRegister.email,
                    password: this.formRegister.password,
                    full_name: this.formRegister.fullname
                }                
            })
            .then(() => {
                swal("Register Succes", "Register New User Success, you will be redirected to login page", "success")
                this.submitted = false
                this.formRegister.email = ""
                this.formRegister.password = ""
                this.formRegister.fullname = ""
                this.$emit('cancelRegister')
            })
            .catch(err => {
                console.log("Error register", err);
                const { error } = err.response.data
                this.submitted = false

                if (error.name == 'SequelizeUniqueConstraintError') {
                    this.registerMessage = 'Email already registered'
                } else {
                    this.registerMessage = error.message
                }
                
            })
        },
    }
};
</script>

<style>
</style>