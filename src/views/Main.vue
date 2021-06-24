<template>
    <div>
        <TaskForm v-if="taskForm" @fetchData="fetchData" @formToggle="formToggle" :tasks="tasks"></TaskForm>
        <form class="float-right mr-3 my-3" @submit.prevent="newCategory">
            <div class="input-group">
                <input class="form-control" type="text" v-model="catName" placeholder="New Category"> <button type="submit" class="btn btn-primary input-group-btn">New Category</button>
            </div>
        </form> <br><br>
        <div class="d-flex flex-row my-4 row">
            <Category v-for="(list, category) in tasks" :key="category" :taskList="list" :category="category" @putCat="putCat(category)" @fetchData="fetchData" @getTarget="getTarget"></Category>
        </div>
    </div>
</template>

<script>
import Category from '../components/Category.vue'
import axios from '../util/axios'
import TaskForm from '../components/TaskForm.vue'
import Swal from 'sweetalert2'
export default {
    components:{
        Category, TaskForm
    },
    data(){
        return{
            target:{},
            tasks:{
                backlog: [],
                todo: [],
                doing: [],
                done: [],
            },
            test: true,
            catName: null
        }
    },
    props: ["taskForm"],
    methods: {
        fetchData(){
            console.log('fetching data')
            this.tasks = {
                    backlog: [],
                    todo: [],
                    doing: [],
                    done: [],
                }
            axios.get(`/tasks`, {headers: {access_token: localStorage.access_token}})
            .then(res => {
                console.log(res)
                res.data.forEach(el => {
                    if (el.deadline){el.deadline = el.deadline.slice(0,10)}
                    if (!this.tasks[el.category]) {this.tasks[el.category] = []}
                    this.tasks[el.category].push(el)
                })
                console.log(this.tasks)
            })
            .catch(err => {
                Swal.fire('Error', err.response.data.message, 'error') 
            })
        },
        getTarget(target){
            this.target = target
        },
        putCat(cat){
            this.target.category = cat
            axios.put(
                `/tasks/${this.target.id}`, 
                this.target, 
                {headers: {access_token: localStorage.access_token}}
            )
            .then(res => {
                this.fetchData()
            })
            .catch(err => {
               Swal.fire('Error', err.response.data.message, 'error'); 
            })
        },
        formToggle(){
            this.$emit('formToggle')
        },
        newCategory(){
            if (this.catName){
                this.tasks[this.catName] = []
                this.catName = null
            }
        }
    },
    created(){
        this.fetchData()
    }
    
}
</script>

<style>

</style>