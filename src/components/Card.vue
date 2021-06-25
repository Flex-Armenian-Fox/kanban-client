<template>
    <div>
        <div v-if="task.editable" draggable="1" @dragstart="dragStart(task)" class='flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto my-1' style="width: 90%;">
            <div class="max-w-lg  w-full bg-gray-300  p-2 rounded-md">
                <p class="text-sm text-gray font-bold">{{task.User.alias}}</p>
                <div class="flex ">
                    <div class="w-full content-between text-w">
                        <div class="text-2xl font-bold text-black uppercase"><a contenteditable="1" @keypress="blurIfEnter($event)" @blur="putName($event)">{{task.name}}</a><a class="text-gray-300">|</a></div>
                    </div>
                </div>
                <div class="d-flex justify-content-between w-full my-2">
                    <input class="form-control-sm" type="date" @change="putDate()" v-model="task.deadline"> <br>
                    <button class="rounded-full btn-sm btn ml-1 btn-danger" @click="delTask()" > Delete </button>
                </div>
            </div>
        </div>

        <div v-if="!task.editable" class='flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto my-1' style="width: 90%;">
            <div class="max-w-lg  w-full bg-gray-500  p-2 rounded-md">
                <p class="text-sm text-gray font-bold">{{task.User.alias}}</p>
                <div class="flex ">
                    <div class="w-full content-between text-w">
                        <div class="text-2xl font-bold text-black uppercase"><a>{{task.name}}</a><a class="text-gray-500">|</a></div>
                    </div>
                </div>
                <div class="d-flex justify-content-between w-full my-2">
                    <input class="form-control-sm" type="date" @change="putDate()" v-model="task.deadline" disabled> <br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../util/axios'

export default {
    props:["task"],
    created(){
    },
    methods: {
        blurIfEnter(e){
            if (e.keyCode==13){
                e.preventDefault()
                e.srcElement.blur()
            }
        },
        dragStart(){
            this.$emit('dragTask', this.task)
        },
        putName(event){
            if (!event.srcElement.textContent) {event.srcElement.textContent = this.task.name}
            else {
                this.task.name = event.srcElement.textContent
                axios.put(
                    `/tasks/${this.task.id}`, 
                    this.task, 
                    {headers: {access_token: localStorage.access_token}}
                )
                .then(res => {
                    this.$emit('fetchData')
                })
                .catch(err => {
                    Swal.fire('error', err.response.data?.message, 'error')
                    this.$emit('fetchData')
                })
            }
        },
        putDate(){
            axios.put(
                `/tasks/${this.task.id}`, 
                this.task, 
                {headers: {access_token: localStorage.access_token}}
            )
            .then(res => {
                this.$emit('fetchData')
            })
            .catch(err => {
                Swal.fire('error', err.response.data?.message, 'error')
                this.$emit('fetchData')
            })
        },
        delTask(){
            let target = this.task
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
                .then((result) => {
                    if(result.value){
                        axios.delete(`/tasks/${target.id}`, {headers: {access_token: localStorage.access_token}})
                        .then(res => {
                            console.log('deleted')
                            this.$emit('fetchData')
                        })
                        .catch(err => {
                            Swal('error', err.response.data?.message, 'error')
                            this.$emit('fetchData')
                        })
                    }
                })

        }
    }
}
</script>

<style>

</style>