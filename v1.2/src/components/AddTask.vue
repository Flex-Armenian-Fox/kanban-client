<template>
    <div class="column is-full mt-1">
        <div class="is-flex is-align-items-center is-justify-content-center">
            <div class="column is-half">
                <form @submit.prevent="addTask" class="box">            
                    <div class="has-text-centered is-size-3 is-family-sans-serif has-text-weight-bold">
                        <h1>Add New Task</h1>
                    </div>                    
                    <div class="field">
                        <label class="label">Task Name</label>
                        <div class="control">
                            <input v-model="formAdd.task_name" type="text" class="input" placeholder="e.g Coding"/>                        
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Task Detail</label>
                        <div class="control">
                            <textarea v-model="formAdd.task_detail" cols="30" rows="10" class="textarea"></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Task Category</label>
                        <div class="control">
                            <div class="select">
                                <select v-model="formAdd.category" class="is-hovered">
                                    <option value="backlog">Backlog</option>
                                    <option value="todo">Todo</option>
                                    <option value="doing">Doing</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <p class="control">
                            <button class="button is-success" v-bind:class="{ 'is-loading': submitted }">
                                Add Task
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../utils/server-helper.js"

export default {
    name: "AddTask",
    data() {
        return {
            formAdd: {
                task_name: "",
                task_detail: "",
                category: "backlog"
            },
            submitted: false
        }
    },
    methods: {
        addTask() {
            this.submitted = true
            axios({
                method: "POST",
                url: "/tasks",
                data: {
                    title: this.formAdd.task_name,
                    task_detail: this.formAdd.task_detail,
                    category: this.formAdd.category
                },
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
            .then(() => {
                this.submitted = false
                swal("Success", "Success Add New Data", "success");
                this.$emit('submitted', 'home')
                this.formAdd.task_name = ""
                this.formAdd.task_detail = ""
                this.formAdd.category = "backlog"
            }).catch((err) => {
                console.log("error add data", err);
            });
        }
    }
};
</script>

<style>
</style>