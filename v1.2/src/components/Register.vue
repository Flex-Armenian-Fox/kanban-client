<template>
    <div class="column is-half">
        <form @submit.prevent="register" class="box">
            <div class="has-text-centered is-size-3 is-family-sans-serif has-text-weight-bold">
                <!-- <p class="subtitle has-text-danger" v-text="loginState.registerMessage" ></p> -->
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
        }
    },
    methods: {
        register: function() {
            // this.submitted = true
            // axios({
            //     method: 'POST',
            //     url: `${this.serverUrl}/users/register`,
            //     data: {
            //         email: this.formRegister.email,
            //         password: this.formRegister.password,
            //         full_name: this.formRegister.fullname
            //     }                
            // })
            // .then(() => {
            //     swal("Register Succes", "Register New User Success, you will be redirected to login page", "success")
            //     this.submitted = false
            //     this.loginState.isRegister = false
            //     this.emptyForm()
            // })
            // .catch(err => {
            //     console.log("error register", err.response.data);
            //     const { error } = err.response.data
            //     this.loginState.registerMessage = error.message
            //     this.submitted = false
            // })
        },
    }
};
</script>

<style>
</style>