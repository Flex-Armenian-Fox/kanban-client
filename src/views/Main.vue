<template>
    <div class="d-flex flex-row justify-content-between my-4 row">
        <Category v-for="(list, category) in tasks" :key="category" :taskList="list" :category="category" @putCat="putCat(category)" @fetchData="fetchData" @getTarget="getTarget"></Category>
        
    </div>
</template>

<script>
import Category from '../components/Category.vue'
import axios from '../util/axios'
export default {
    components:{
        Category
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
        }
    },
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
                console.error(err); 
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
                console.error(err); 
            })
        },
    },
    created(){
        this.fetchData()
    }
    
}
</script>

<style>

</style>