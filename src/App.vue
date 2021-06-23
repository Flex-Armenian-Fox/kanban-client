<template>
    <div>
        <Header></Header>
        <Main></Main>
    </div>
</template>

<script>
import Main from './views/Main.vue'
import Header from './components/Header.vue'
export default {
    name: "App",
    components:{Main, Header},
}
</script>

<style>

</style>