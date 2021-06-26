<template>
    <section id="kanban" class="kanban">
        <div class="kanban-container bg-light">
            <KanbanStrip 
            v-for="board in boards" 
            :key="board.id" 
            :board="board" 
            :card="getCardData(board.name)" 
            @AddCardClick="showAddTask"
            @EditCardClick="showEditTask"
            @DeleteCardClick="deleteTask">
            </KanbanStrip>
            <form-data v-if="showModal" :taskData="taskData" @close="showModal = false" @taskData="addTask"/>
        </div>
    </section>    
</template>

<script>
import KanbanStrip from "../components/KanbanStrip.vue"
import FormData from "../components/FormData.vue"
import axios from "axios"
import Swal from 'sweetalert2'

const baseUrl = "https://kanbanbudi.herokuapp.com"

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
        showModal: false,
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
            this.taskData.title =  "",
            this.taskData.category = category,
            this.taskData.id = 0
            this.showModal = true;
            console.log("ADDD DATA" , this.taskData)
        },
        showEditTask(data){
            console.log("RUN")
            this.taskData.title = data.title,
            this.taskData.category = data.category,
            this.taskData.id = data.id
            this.showModal = true;
        },
        addTask(data){
            console.log("Data Diterima", data)
            // return
            // console.log(baseUrl)
            this.showModal = false;
            this.taskData.title = data.title
            this.taskData.category = data.category

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
                    access_token: localStorage.getItem("access_token")
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
                    access_token:  localStorage.access_token
                },
            })
            .then(respon => {
                this.fetchData();
                console.log("Deleted")
            })
            .catch(error => {
                 Swal.fire({
                    type: 'warning',
                    title: error.response.data.message,
                    message: error.response.data.message,
                    showConfirmButton: true,
                    timer: 1500
                });
            })
        }
    },
    created(){
        this.fetchData();
    },
}
</script>

