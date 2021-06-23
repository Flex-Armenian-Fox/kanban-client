<template>
    <div>
        <Navbar @LoggedOut="$emit('LoggedOut')"></Navbar>
        <section>
            <div class="columns is-flex-direction-column is-align-items-stretch is-justify-content-center">
                <Category :taskData="tasks"></Category>
            </div>
        </section>
    </div>
</template>

<script>
import Category from "../components/Category.vue";
import Navbar from "../components/Navbar.vue";
import axios from "../utils/server-helper.js";

export default {
    name: "Home",    
    components: { Category, Navbar },
    data() {
        return {
            tasks: []
        };
    },
    methods: {
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
        // console.log("isi taskbyCat", this.taskByCategory);
        this.fetchData()
    }    
};
</script>

<style>
</style>