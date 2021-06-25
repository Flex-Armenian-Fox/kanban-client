<template>
    <section id="kanban" class="kanban">
        <div class="kanban-container bg-light">
            <KanbanStrip v-for="board in boards" :key="board.id" :board="board" :card="getCardData(board.name)"></KanbanStrip>
            <!-- <form-data v-show="isModalVisible"/> -->
        </div>
    </section>    
</template>

<script>
import KanbanStrip from "../components/KanbanStrip.vue"
import FormData from "../components/FormData.vue"
import axios from "axios"
const baseUrl = "http://localhost:3000"

export default {
    name: "KanbanPage",
    components: {
        KanbanStrip, FormData
    },
    data() {
      return {
        boards: [
            {id:1, name: "Backlog"},
            {id:2, name: "Product"},
            {id:3, name: "Development"},
            {id:4, name: "Done"},
        ], 
        isModalVisible: false,
        title: "Kanban Board",
        tasks: [],
        taskData: {
            title: "",
            category: "",
            id: 0
        }
      }
    },
    computed: {},
    methods: {
        getCardData(category){
            // category = "Backlog"
            console.log(category)
            return this.tasks.filter(el => el.category == category)
            // return category
        },
        fetchData(){
            axios({
                method: "GET",
                url: baseUrl + "/tasks",
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(respon => {
                this.tasks = respon.data

                console.log(this.tasks)
            })
            .catch(err => {
                console.log(err)
            })
        },
        showAddTask(category){
            this.isModalVisible = true
            this.taskData.title =  "",
            this.taskData.category = category,
            this.taskData.id = 0
            console.log(this.taskData)
        },
        showEditTask(data){
            console.log("RUN")
            this.taskData.title = data.title,
            this.taskData.category = data.category,
            this.taskData.id = data.id
        },
        addTask(){
            console.log(baseUrl)
            let methodType;
            let urlAxios;

            if (this.taskData.id == 0){
                methodType = "POST"
                urlAxios = baseUrl + "/tasks"
            } else {
                methodType = "PUT"
                urlAxios = baseUrl + "/tasks/" + this.taskData.id
            }    
            console.log(methodType, urlAxios)
            axios({
                method: methodType,
                url: urlAxios,
                headers: {
                    access_token: token
                },
                data: {
                    title: this.taskData.title,
                    category: this.taskData.category
                }
            })
            .then(respon => {
                this.fetchData();
                // this.taskData = "";

                console.log("CreatedOrUpdate")
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteTask(id){
            axios({
                method: "DELETE",
                url: baseUrl + "/tasks/" + id,
                headers: {
                    access_token: token
                },
            })
            .then(respon => {
                this.fetchData();
                // this.taskData = "";

                console.log("Deleted")
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created(){
        this.fetchData();
    },
}
</script>

