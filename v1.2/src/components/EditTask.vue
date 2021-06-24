<template>
    <div class="modal" v-bind:class="{ 'is-active': showEdit }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Edit Task</p>
                <button @click="$emit('closeEdit', false)" class="delete" aria-label="close"></button>
            </header>
            <form @submit.prevent="editData" class="box">
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label">Task Title</label>
                        <div class="control">
                            <input v-model="formEdit.taskTitle" type="text" class="input" />
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Task Detail</label>
                        <div class="control">
                            <textarea
                                v-model="formEdit.taskDetail"
                                cols="30"
                                rows="10"
                                class="textarea"
                            ></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Task Category</label>
                        <div class="control">
                            <div class="select">
                                <select v-model="formEdit.taskCategory" class="is-hovered" >
                                    <option value="backlog">Backlog</option>
                                    <option value="todo">Todo</option>
                                    <option value="doing">Doing</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" v-bind:class="{ 'is-loading': submitted }">Save changes</button>
                    <button @click.prevent="$emit('closeEdit', false)" class="button"> Cancel </button>
                </footer>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "../utils/server-helper.js"

export default {
    name: "EditTask",
    props: ["showEdit", "taskId"],
    data() {
        return {
            submitted: false,
            formEdit: {
                taskTitle: "",
                taskDetail: "",
                taskCategory: ""
            }
        }
    },
    methods: {
        editData() {
            this.submitted = true
            axios({
                method: "PUT",
                url: `/tasks/${this.taskId}`,
                data: {
                    title: this.formEdit.taskTitle,
                    category: this.formEdit.taskCategory,
                    task_detail: this.formEdit.taskDetail
                },
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
            .then(() => {
                swal("Success", "Update Success", "success")
                this.formEdit.taskTitle = ""
                this.formEdit.taskDetail = ""
                this.formEdit.taskCategory = ""
                this.$emit('closeEdit', true)
            }).catch((err) => {
                const { error } = err.response.data
                this.submitted = false
                swal("Error", `${error.message}`, "error")
            });
        }
    },
    created() {
        axios({
            method: "GET",
            url: `/tasks/${this.taskId}`,
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        })
        .then(({ data: response }) => {
            const result = response.data
            this.formEdit.taskTitle = result.title
            this.formEdit.taskDetail = result.task_detail
            this.formEdit.taskCategory = result.category
        }).catch((err) => {
            const { error } = err.response.data
            swal("Error", `${error.message}`, "error")
        });
    }
};
</script>

<style>
</style>