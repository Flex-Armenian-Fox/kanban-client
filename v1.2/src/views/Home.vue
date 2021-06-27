<template>
    <div>
        <Navbar @LoggedOut="$emit('LoggedOut')" @clickAction="updatePage"></Navbar>
        <section>
            <div class="columns is-flex-direction-column is-align-items-stretch is-justify-content-center">                
                <Category
                    v-if="page === 'home'" 
                    :taskData="tasks"
                    @refetch="fetchData"
                ></Category>
                <AddTask @submitted="updatePage" v-else-if="page === 'addTask'"></AddTask>
                <ProgressBar v-if="isLoading === true"></ProgressBar>
            </div>
        </section>
    </div>
</template>

<script>
import Category from "../components/Category.vue";
import ProgressBar from "../components/ProgressBar.vue"
import Navbar from "../components/Navbar.vue";
import AddTask from "../components/AddTask.vue";
import axios from "../utils/server-helper.js";

export default {
    name: "Home",    
    components: { Category, Navbar, AddTask, ProgressBar },
    data() {
        return {
            tasks: [],
            page: "home",
            isLoading: false
        };
    },
    methods: {
        updatePage(value) {
            this.page = value
            if (this.page === 'home') this.fetchData()
        },
        fetchData() {
            this.isLoading = true
            axios({
                method: "GET",
                url: '/tasks',
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
            .then(({ data:response }) => {
                this.isLoading = false
                this.tasks = response.data
            })
            .catch(err => {
                console.log("error", err);
            })
        }
    },
    created() {
        this.fetchData()
    }    
};
</script>

<style>
</style>