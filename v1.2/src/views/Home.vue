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
            </div>
        </section>
    </div>
</template>

<script>
import Category from "../components/Category.vue";
import Navbar from "../components/Navbar.vue";
import AddTask from "../components/AddTask.vue";
import axios from "../utils/server-helper.js";

export default {
    name: "Home",    
    components: { Category, Navbar, AddTask },
    data() {
        return {
            tasks: [],
            page: "home"
        };
    },
    methods: {
        updatePage(value) {
            this.page = value
            if (this.page === 'home') this.fetchData()
        },
        fetchData() {
            axios({
                method: "GET",
                url: '/tasks',
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
            .then(({ data:response }) => {
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