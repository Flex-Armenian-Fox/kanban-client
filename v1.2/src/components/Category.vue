<template>
    <div class="column is-full">
        <div class="mb-4">
            <h2 class="is-size-3 has-text-weight-light has-text-white">
                <center>Kanban Board</center>
            </h2>
        </div>

        <div class="columns">            
            <TaskCard 
                :taskByCategory="taskByCategory" 
                v-for="category in categories" 
                :category="category"
                :key="category.id"
                :categories="categories"
                @refetch="$emit('refetch')"
            ></TaskCard>            
        </div>
    </div>
</template>

<script>
import TaskCard from "./TaskCard.vue"

export default {
    name: "Category",
    props: ["taskData"],
    components: { TaskCard },
    data() {        
        return {
            categories: [
                { id: 1, name: "backlog" },
                { id: 2, name: "todo" },
                { id: 3, name: "doing" },
                { id: 4, name: "done" },
            ]
        };
    },       
    computed: {
        taskByCategory() {
            const taskCategory = {}
            this.taskData.forEach(el => {
                if (!taskCategory[el.category]) {                    
                    taskCategory[el.category] = []
                }
                taskCategory[el.category].push(el)
            });

            return taskCategory
        }
    }
};
</script>

<style>
</style>