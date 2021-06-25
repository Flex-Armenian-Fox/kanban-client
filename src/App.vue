<template>
    <div>
        <Header @checkAuth="checkAuth" @formToggle="formToggle" :isLoggedIn="isLoggedIn"></Header>
        <Main v-if="isLoggedIn" :taskForm="taskForm" @formToggle="formToggle"></Main>
        <Login v-if="!isLoggedIn" @checkAuth="checkAuth"></Login>
    </div>
</template>

<script>
import Main from './views/Main.vue'
import Header from './components/Header.vue'
import Login from './views/User.vue'

export default {
    name: "App",
    components:{Main, Header, Login},
    data(){
        return {
            isLoggedIn: false,
            taskForm: false
        }
    },
    methods: {
        checkAuth() {
            if (localStorage.access_token) this.isLoggedIn = true
            else this.isLoggedIn = false
        },
        formToggle(){
            this.taskForm = (this.taskForm)? false :true
        }
    },
    created(){
        console.log("created App.vue")
        this.checkAuth()
    },
}
</script>

<style>

</style>