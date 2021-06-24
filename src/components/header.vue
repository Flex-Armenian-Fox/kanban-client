<template>
  <header>
    <div class="navbar navbar-dark bg-dark box-shadow">
            <div class="container d-flex justify-content-between">
            <a href="#" class="navbar-brand d-flex align-items-center">
                <strong>Kanban</strong>
            </a>
            <div class="ml-auto" id="top-btns" v-if="isLoggedIn">
                <button class="btn btn-success" @click="newTask">New Task</button>
                <button class="btn btn-danger" @click="logout">Logout</button>
            </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data(){
        return {
            title: ""
        }
    },
    props: ["isLoggedIn"],
    methods:{
        logout(){
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
                localStorage.clear()
            }).then(() => {
                this.$emit("checkAuth")
            })
        },
        newTask(){
            this.$emit("formToggle")
        },
    }
}

</script>

<style>

</style>