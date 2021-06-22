<template>
    <div>
        <header></header>
        <login v-if="!isLoggedIn" @checkAuth="checkAuth"></login>
        <kanban v-if="isLoggedIn"></kanban>
    </div>
</template>

<script>
import login from "./views/login"
import header from './components/header.vue'
import kanban from './views/kanban.vue'
export default {
    components:{login, kanban, header}
}
</script>

<style>

</style>