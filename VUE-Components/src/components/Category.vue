<template>
    <div>

    <!-- START - CATEGORY COLUMN -->
        <div class="bg-gray-200 m-4 pb-1 shadow-md rounded-lg min-h-full max-h-full max-w-2xl">
            
            <!-- -- Column Title + Add Todo Icon -->
            <div class="flex flex-row justify-between">
                <div class="p-2 m-3 w-24 h-8 bg-gray-500 text-gray-100 shadow rounded-3xl text-xs tracking-widest font-extrabold grid justify-items-center">{{category.name.toUpperCase()}}</div>
                <button @click.prevent="showAddTask = true" class="mx-3 my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-500 hover:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
            </div>
            
            <!-- START - TASK COMPONENT -->
            <TaskComponent v-for="task in tasksCatalog[category.name]" :key="task.id" :taskDetails="task" :taskCategory="tasksCatalog[category.name]" :tasksCatalog="tasksCatalog" @fetchUlangPlis="fetchDiKanban"></TaskComponent>
            <!-- END - TASK COMPONENT -->

            <!-- START - FORMULIR NEW TASK -->
            <NewTaskForm v-if="showAddTask" @ubahStatusShowForm="showAddTask = false"></NewTaskForm>
            <!-- END - FORMULIR NEW TASK -->

        </div>
        <!-- END - CATEGORY COLUMN -->

    </div>
</template>

<script>
import TaskComponent from './Task.vue'
import NewTaskForm from './NewTaskForm.vue'

export default {
    name: 'CategoryComponent',
    props: ['category', 'tasksCatalog'],
    components: {
        TaskComponent,
        NewTaskForm
    },
    data () {
        return {
            showAddTask: false,
            finalTaskToCreate: {}
        }
    },
    methods: {
        categoryColorFunct (categoryName) {
            switch (categoryName) {
                case 'backlog':
                    this.categoryColor = '<div class="p-2 m-3 w-24 h-8 bg-gray-500 text-gray-100 shadow rounded-3xl text-xs tracking-widest font-extrabold grid justify-items-center">BACKLOG</div>'
                    break
                case 'todo':
                    this.categoryColor = '<div class="p-2 m-3 w-20 h-8 bg-blue-600 text-gray-200 shadow rounded-3xl text-xs tracking-widest font-extrabold grid justify-items-center">TODO</div>'
                    break
                case 'doing':
                    this.categoryColor = '<div class="p-2 m-3 w-20 h-8 bg-yellow-500 text-gray-100 shadow rounded-3xl text-xs tracking-widest font-extrabold grid justify-items-center">DOING</div>'
                    break
                case 'done':
                    this.categoryColor = '<div class="p-2 m-3 w-20 h-8 bg-green-500 text-white shadow rounded-3xl text-xs tracking-widest font-extrabold grid justify-items-center">DONE</div>'
                    break
            }
        },
        fetchDiKanban(){
            this.$emit('fetchUlangDiKanban')
        },
        createNewTask(taskObj) {
            // taskObj cuma berisi TITLE, DESC, dan DUE_DATE
            // ?? Tambahkan CATEGORY
            // assign this.finalTaskToCreate
            // panggil AXIOS untuk POST, masukkan this.finalTaskToCreate sebagai input datanya
        }
    }
}
</script>

<style>

</style>