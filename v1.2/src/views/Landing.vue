<template>
    <div class="is-flex is-align-items-center is-justify-content-center" style="height: 100vh">        
        <Login 
            :server="server" 
            v-if="!loginState.isRegister" 
            @registerClick="loginState.isRegister=true"
            @LoggedIn="$emit('LoggedIn')"
        ></Login>
        <Register 
            :server="server" 
            v-else 
            @cancelRegister="loginState.isRegister=false"
        ></Register>
    </div>
</template>

<script>
import Login from "../components/Login.vue"
import Register from "../components/Register.vue"

export default {
    name: "Landing",
    props: ["server"],
    components: { Login, Register },
    data() {
        return {
            loginState: {
                loginMessage: "",
                registerMessage: "",
                isRegister: false
            }
        }
    }
};
</script>

<style>
</style>