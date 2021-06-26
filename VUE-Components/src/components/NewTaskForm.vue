<template>
    <div>

        <!-- START - ADD NEW TASK -->
        <section v-show="addNew_backlog">
            <div class="bg-gray-50 w-60 mx-3 mt-1 mb-3 shadow-md min-w-0 min-h-0 max-h-full rounded-2xl">

                <!-- --Title + Description -->
                <div class="flex flex-col">
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
                            <button @click.prevent="hideForm_backlog()" class="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-sm font-normal rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save
                            </button>
                            <button @click.prevent="hideForm_backlog()" type="button" class="inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-sm font-normal rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Cancel
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </section>
        <!-- END - ADD NEW TASK -->

    </div>
</template>

<script>
export default {
    name: 'NewTaskForm'
}
</script>

<style>

</style>