<template>
    <div>
        <Landing             
            @LoggedIn="isLogin=true"
            v-if="!isLogin"
        ></Landing>
        <Home
            v-else
            @LoggedOut="isLogin=false"
        ></Home>
    </div>
</template>

<script>
import Landing from "./views/Landing.vue"
import Home from './views/Home.vue'

export default {
    name: "App",
    components: { Landing, Home },
    data() {
        return {
            message: "This is v1.2",
            isLogin: false            
        };
    },
    created: function() {
        if (localStorage.getItem("access_token")) {
            this.isLogin = true
        } else {
            this.isLogin = false
        }
    },
};
</script>

<style scoped></style>