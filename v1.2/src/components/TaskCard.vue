<template>
    <div class="column is-3">  
        <header 
            v-bind:class="{
                'card-header has-background-warning': category.name == 'backlog',
                'card-header has-background-info-dark': category.name == 'todo',
                'card-header has-background-success': category.name == 'doing',
                'card-header has-background-danger': category.name == 'done',
            }"
        >
            <p class="card-header-title">
                <span class="icon">
                    <i class="fas fa-thumbtack"></i>
                </span>
                <span>{{category.name.toUpperCase()}}</span>
            </p>
        </header>

        <div v-for="item in taskByCategory[category.name]" :key="item.id" class="card mb-3">        
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img v-bind:src="item.User.img_url" />                            
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">
                            {{ item.User.full_name }}
                        </p>
                        <p class="subtitle is-6">
                            {{ item.User.email }}
                        </p>
                    </div>
                </div>
                <div class="content">
                    <p class="title is-size-5 is-capitalized">
                        {{ item.title }}
                    </p>
                    <p class="is-size-6">{{ item.task_detail }}</p>
                </div>
            </div>
            <footer class="card-footer">
                <div class="card-footer-item field is-grouped">
                    <p class="control">
                        <a @click="editClick(item.id)" class="button is-link">Edit</a>
                    </p>
                    <p class="control">
                        <a @click="deleteTask(item.id, item.title)" class="button is-danger">Delete</a>
                    </p>

                    <div class="control">
                        <div class="select is-link">
                            <select @change="changeTaskCategory(item.id, item.category)" v-model="item.category">
                                <option v-for="value in categories" :key="value.id">{{value.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        <EditTask 
            v-if="showEdit" 
            :showEdit="showEdit = true" 
            @closeEdit="closeEdit" 
            :taskId="taskId"
        ></EditTask>
    </div>
</template>

<script>
import EditTask from "./EditTask.vue"
import axios from "../utils/server-helper.js"

export default {
    name: "TaskCard",
    components: { EditTask },
    props: ["taskByCategory", "category", "categories"],
    data() {
        return {
            showEdit: false,
            taskId: 0
        }
    },
    methods: {
        editClick(id) {
            this.taskId = id
            this.showEdit = true
        },
        closeEdit(value) {
            this.showEdit = false
            if (value) this.$emit('refetch')
        },
        deleteTask(id, title) {
            swal({
                title: "Are you sure?",
                text: `Delete task ${title}`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmDelete) => {
                if (confirmDelete) {
                    axios({
                        method: 'DELETE',
                        url: `/tasks/${id}`,
                        headers: {
                            access_token: localStorage.getItem("access_token")
                        }
                    })
                    .then(() => {
                        swal("Success", "Task Deleted", "success")
                        this.$emit('refetch')
                    })
                    .catch(err => {
                        const { error } = err.response.data                                        
                        swal("Error", `${error.message}`, "error")
                    })
                }
            });
        },
        changeTaskCategory(id, category) {
            axios({
                method: 'PATCH',
                url: `/tasks/${id}`,
                data: { category },
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
            .then(() => {
                this.$emit('refetch')
            })
            .catch(err => {
                const { error } = err.response.data
                swal("Error", `${error.message}`, "error")
                this.$emit('refetch')
            })
        }
    }
};
</script>

<style>
</style>