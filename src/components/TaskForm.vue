<template>
  <div class="w-50 rounded-lg bg-dark p-3 my-2 justify-content-center mx-auto">
    <div class="text-3xl text-bold text-white uppercase ml-2 my-2">New Task</div>
    <div class="text-md font-bold text-center text-red-700" id="login-error">{{errMsg}}</div>
        <form id="new-task" class="" @submit.prevent="postTask">
            <label class="text-bold text-white uppercase mx-auto my-1">Task Name:</label> <br>
            <input class="form-control input-sm" type="text" v-model="newName">
            <label class="text-bold text-white uppercase mx-auto my-1">Deadline:</label> <br>
            <input class="form-control input-sm" type="date" v-model="newDate">
            <label class="text-bold text-white uppercase mx-auto my-1">Category:</label> <br>
            <select class="form-control input-sm" v-model="newCat">
                <option v-for="(task, category) in tasks" :key="category">{{category}}</option>
                <option>New Category</option>
            </select> <br>
            <input class="form-control input-sm" type="text" v-if="(newCat == 'New Category')" v-model="customCat">
            <br>
            <button type="submit" class="btn btn-primary">submit</button>
            <button type="button" @click="formToggle" class="btn btn-secondary float-right">back</button>
        </form>
    </div>
</template>

<script>
import axios from '../util/axios'
export default {
    data(){
        return{
            newName: null,
            newDate: null,
            newCat: "backlog",
            customCat: null,
            errMsg: null,
        }
    },
    props: ["tasks"],
    methods: {
        postTask(){
            let data = {
                name: this.newName,
                deadline: this.newDate,
                category: (this.newCat == 'New Category')? this.customCat : this.newCat
            }
            axios.post(
                `/tasks/`, 
                data, 
                {headers: {access_token: localStorage.access_token}}
            )
            .then(res => {
                this.$emit('formToggle')
                this.$emit('fetchData')
            })
            .catch(err => {
                this.errMsg = err.response.data.message
            })
        },
        formToggle(){
            this.errMsg = null
            this.$emit('formToggle')
        }
    }
}
</script>

<style>

</style>