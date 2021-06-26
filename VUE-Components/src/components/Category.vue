<template>
    <div>

    <!-- START - BACKLOG -->
        <div class="bg-gray-200 m-4 pb-1 shadow-md rounded-lg min-h-full max-h-full max-w-2xl">
            
            <!-- -- Column Title + Add Todo Icon -->
            <div class="flex flex-row justify-between">
                <div class="p-2 m-3 w-24 h-8 bg-gray-500 text-gray-100 shadow rounded-3xl text-xs tracking-widest font-extrabold grid justify-items-center">{{category.name.toUpperCase()}}</div>
                <button @click="showNewTaskForm(category.name)" class="mx-3 my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-500 hover:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
            </div>
            
            <!-- TASK COMPONENT goes here -->
            <TaskComponent v-for="task in tasksCatalog" :key="task.id"></TaskComponent>

            <!-- START - ADD NEW BACKLOG -->
            <!-- <section v-show="addNew_backlog">
                <div class="bg-gray-50 w-60 mx-3 mt-1 mb-3 shadow-md min-w-0 min-h-0 max-h-full rounded-2xl"> -->

                    <!-- --Title + Description -->
                    <!-- <div class="flex flex-col">
                        <form @submit.prevent="addNewTask('backlog')" id="add-backlog-form">
                            <div class="col-span-6 sm:col-span-3 mt-2 mx-3">
                                <label for="backlog-title" class="block text-xs font-semibold antialiased tracking-widest text-gray-400">TITLE</label>
                                <input v-model="newTask.title" type="text" name="backlog-title" id="backlog-title" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-200 rounded-md">
                            </div>
                            <div class="mt-2 mx-3">
                                <label for="backlog-description" class="block text-xs font-semibold antialiased tracking-widest text-gray-400">DESCRIPTION</label>
                                <textarea v-model="newTask.description" id="backlog-description" name="backlog-description" rows="2" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-200 rounded-md"></textarea>
                            </div>
                            <section>
                                <div class="col-span-6 sm:col-span-3 lg:col-span-2 mt-2 mx-3">
                                    <label for="backlog-duedate" class="block text-xs font-semibold antialiased tracking-widest text-gray-400">DUE DATE</label>
                                    <input v-model="formDueDate" type="date" name="backlog-duedate" id="backlog-duedate" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-200 rounded-md">
                                </div>
                            </section>
                            <div class="px-2 py-3 sm:px-3 ">
                                <button @click="hideForm_backlog()" class="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-sm font-normal rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Save
                                </button>
                                <button @click="hideForm_backlog()" type="button" class="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-sm font-normal rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Cancel
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </section> -->
            <!-- END - ADD NEW BACKLOG -->

        </div>
        <!-- END - BACKLOG -->

    </div>
</template>

<script>
import TaskComponent from './Task.vue'

export default {
    name: 'CategoryComponent',
    props: ['category', 'tasksCatalog'],
    components: {
        TaskComponent
    },
    data () {
        return {
            
        }
    },
    methods: {
        showNewTaskForm (categoryName) {
            // UNTUK: tambah Task baru (tombol + di atas kanan)
        },
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
        }
    }
}
</script>

<style>

</style>