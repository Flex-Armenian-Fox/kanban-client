<template>
  <div>
    <main>
        <div class="max-w-7xl mx-auto overflow-x-auto py-6 sm:px-6 lg:px-8">
                
                <!-- START - CATEGORY COMPONENT -->
                <div class="flex flex-row justify-center items-start px-4 py-6 mx-4 min-w-min sm:px-0">
                    <CategoryComponent v-for="(category, index) in categories"
                        :key="category.id"
                        :index="index"
                        :category="category"
                        :tasksCatalog="filteredTasks"
                        @fetchUlangDiKanban="fetchDataUlang"
                        @createTaskFetchData="createTaskFetchData">
                    </CategoryComponent>
                </div>
                <!-- END - CATEGORY COMPONENT -->

        </div>
    </main>
  </div>
</template>

<script>
const axios = require('axios')
import CategoryComponent from '../components/Category.vue'

export default {
    components: {
        CategoryComponent
    },
    data() {
        return {
            categories: [
                {id: 1, name: 'backlog'},
                {id: 2, name: 'todo'},
                {id: 3, name: 'doing'},
                {id: 4, name: 'done'}
            ],
            tasks: []
        }
    },
    computed: {
        filteredTasks() {
            let result = {}

            this.tasks.forEach(task => {
                if (result[task.category] === undefined) {
                    result[task.category] = []
                }
                result[task.category].push(task)
            })
            return result
        }
    },
    methods: {
        showTasks() {
            axios.get('http://localhost:3000/tasks', {
                headers: {
                    accesstoken: localStorage.getItem('accesstoken')
                }
            })
            .then(tasks => {
                console.log('INI TASKS ==>', tasks)
                this.tasks = tasks.data.tasks
                console.log('INI this.tasks ==>', this.tasks)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchDataUlang() {
            this.showTasks()
        },
        createTaskFetchData() {
            this.showTasks()
        }
    },
    created() {
        this.showTasks()
    }
}
</script>

<style>

</style>