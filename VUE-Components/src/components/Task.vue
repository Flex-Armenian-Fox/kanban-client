<template>
  <div>
      <!-- START CARD TASK -->
            
            <div class="bg-white hover:bg-gray-50 w-60 mx-3 mt-1 mb-3 shadow-md min-w-0 min-h-0 max-h-full rounded-2xl">

                <!-- --Due Date + Icon -->
                <div class="flex flex-row p-3">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div class="text-gray-500 text-xs font-semibold antialiased tracking-wide">{{ dueDate_formatter(task.due_date) }}</div>
                </div>

                <!-- --Title + Description -->
                <div class="flex flex-col">
                    <div class="text-gray-800 text-base font-bold py-0 px-3 max-h-full antialiased overflow-y-auto">{{ task.title }}</div>
                    <div class="text-gray-500 text-xs font-normal py-1 px-3 mb-2 max-h-14 leading-relaxed antialiased overflow-y-auto">{{ task.description }}</div>
                </div>

                <!-- --Edit + Delete Buttons -->
                <div class="flex flex-row p-3">
                    <button class="mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500 hover:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button @click="deleteTask(task.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
            
            <!-- END CARD TASK -->

  </div>
</template>

<script>
const axios = require('axios')

export default {
    name: 'TaskComponent',
    data() {
        return {

        }
    },
    methods: {
        dueDate_formatter(date_input) {
            let array = date_input.toDateString().toUpperCase().split(' ')
            let result = `${array[2]} ${array[1]} ${array[3]}`
            return result
        },
        deleteTask(id_string) {

            let id = +id_string
            let newTasks = this.tasks.filter(el => el.id !== id)
            this.tasks = newTasks
        }
    }

}
</script>

<style>

</style>