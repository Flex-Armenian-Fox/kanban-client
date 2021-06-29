<template>
    <div>

        <!-- START - EDIT TASK -->
        
            <div class="bg-gray-50 w-60 mx-3 mt-1 mb-3 shadow-md min-w-0 min-h-0 max-h-full rounded-2xl">

                <!-- --Title + Description -->
                <div class="flex flex-col">
                    <form id="edit-task-form">
                        <div class="col-span-6 sm:col-span-3 mt-2 mx-3">
                            <label for="edit-title" class="block text-xs font-semibold antialiased tracking-widest text-gray-400">TITLE</label>
                            <input v-model="editedTask.title" type="text" name="backlog-title" id="backlog-title" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-200 rounded-md">
                        </div>
                        <div class="mt-2 mx-3">
                            <label for="edit-description" class="block text-xs font-semibold antialiased tracking-widest text-gray-400">DESCRIPTION</label>
                            <textarea v-model="editedTask.description" id="edit-description" name="edit-description" rows="2" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-200 rounded-md"></textarea>
                        </div>
                        <div class="mt-2 mx-3">
                            <label for="edit-description" class="block text-xs font-semibold antialiased tracking-widest text-gray-400">CATEGORY</label>
                            <select id="cars" v-model="editedTask.category" form="edit-task-form" class="shadow-sm mt-1 block w-full sm:text-sm border border-gray-200 rounded-md">
                                <option value="backlog">Backlog</option>
                                <option value="todo">Todo</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <section>
                            <div class="col-span-6 sm:col-span-3 lg:col-span-2 mt-2 mx-3">
                                <label for="edit-duedate" class="block text-xs font-semibold antialiased tracking-widest text-gray-400">DUE DATE</label>
                                <input v-model="editedTask.due_date" type="date" name="edit-duedate" id="edit-duedate" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-200 rounded-md">
                            </div>
                        </section>
                        <div class="px-2 py-3 sm:px-3 ">
                            <button @click.prevent="confirmEditTask" class="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-sm font-normal rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save
                            </button>
                            <button @click.prevent="ubahStatusEditForm" type="button" class="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-sm font-normal rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Cancel
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        
        <!-- END - EDIT TASK -->

    </div>
</template>

<script>
export default {
    name: 'EditTaskForm',
    props: ['taskObjToEdit', 'taskCategoryEdit'],
    data () {
        return {
            editedTask: {
                title: this.taskObjToEdit.title,
                description: this.taskObjToEdit.description,
                due_date: this.dateFormatter(this.taskObjToEdit.due_date),
                category: this.taskObjToEdit.category
            }
        }
    },
    methods: {
        ubahStatusEditForm() {
            this.$emit('ubahStatusEditForm')
        },
        confirmEditTask() {
            this.$emit('confirmEditTask', this.editedTask)
        },
        dateFormatter (input_date) {
            let dateOnly = (new Date(input_date.slice(0,10))).toDateString().split(' ')
            let cleanDate = (`${dateOnly[2]} ${dateOnly[1]} ${dateOnly[3]}`).toUpperCase()
            return cleanDate
        }
    }
}
</script>

<style>

</style>