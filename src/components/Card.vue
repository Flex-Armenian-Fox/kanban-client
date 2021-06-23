<template>
    <div>
        <p>from card</p>
        <div draggable="1" @dragstart="dragStart(task)" class='flex max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden mx-auto my-1' style="width: 90%;">
            <div class="max-w-lg  w-full bg-gray-500  p-3 rounded-md">
                <div class="flex ">
                    <div class="w-full content-between text-w">
                        <div class="text-2xl font-bold text-black uppercase"><a contenteditable="1" @keypress="blurIfEnter($event)" @blur="putName($event)">{{task.name}}</a><a class="text-gray-500">|</a></div>
                    </div>
                </div>
                <div class="d-flex justify-content-between w-full my-2">
                    <input class="form-control-sm" type="date" @change="putDate()" v-model="task.deadline"> <br>
                    <button class="rounded-full btn-sm btn ml-1 btn-danger" @click="delTask()"> Delete </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from '../util/axios'

export default {
    props:["task"],
    created(){
        console.log('card created')
    },
    methods: {
        blurIfEnter(e){
            if (e.keyCode==13){
                e.preventDefault()
                console.log(e)
                e.srcElement.blur()
            }
        },
        dragStart(){
            console.log(this.task)
            this.$emit('dragTask', this.task)
        },
        putName(event){
            console.log('start name')
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
                    console.error(err); 
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
                console.error(err); 
            })
        },
        delTask(){
            console.log('triggered')
            axios.delete(`/tasks/${this.task.id}`, {headers: {access_token: localStorage.access_token}})
            .then(res => {
                this.$emit('fetchData')
            })
            .catch(err => {
                console.error(err); 
            })
        }
    }
}
</script>

<style>

</style>