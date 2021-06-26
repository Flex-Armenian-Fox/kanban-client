<template>
  <div>
    <main>
        <div class="max-w-7xl mx-auto overflow-x-auto py-6 sm:px-6 lg:px-8">
            <div class="flex flex-row justify-center items-start px-4 py-6 mx-4 min-w-min sm:px-0">
                
                <!-- START - CATEGORY COMPONENT -->
                <div>
                    <CategoryComponent v-for="(category, index) in categories"
                    :key="category.id"
                    :index="index"
                    :category="category"
                    :tasksCatalog="filteredTasks"></CategoryComponent>
                </div>
                <!-- END - CATEGORY COMPONENT -->

            </div>
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
            // for (let i = 0; i < this.tasks.length; i++) {
            //     if (result[this.tasks[i].category] === undefined) {
            //         result[this.tasks[i].category] = []
            //     }
            //     result[this.tasks[i].category].push(this.tasks[i])
            // }
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
                this.tasks = tasks.data
                console.log('INI this.tasks ==>', this.tasks)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.showTasks()
    }
}
</script>

<style>

</style>