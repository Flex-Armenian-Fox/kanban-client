<template>
    <div class="kanban-column">
        <div class="kanban-column-header">
        {{board.name}}
        <!-- {{card}} -->
        </div>
        <ul class="kanban-column-list">
            <li v-for="(item, i) in card" :key="i" class="card border-secondary mb-3"
                style="max-width: 18rem;">
                <div class="card-header card-header-addon">
                <div>Posted : {{item.user.email.split("@")[0]}}</div>
                </div>
                <div class="card-body text-secondary">
                <p class="card-text">{{item.title}}</p>
                </div>
                <div>
                    <!-- <i type="button" @click="showEditTask(item)" id="edit-task" class="fas fa-edit"></i>
                    <i type="button" @click="deleteTask(item.id)" id="delete-task" class="fas fa-trash"></i> -->

                    <button @click="showEditTask(item)" type="button" class="btn btn-primary">Edit</button>
                    <button @click="deleteTask(item.id)" type="button" class="btn btn-danger">Delete</button>
                </div>
            </li>
        </ul>
        <div class="kanban-column-footer">
        <div class="d-grid gap-2">
            <button @click="showAddTask(board.name)" type="button" class="btn btn-primary">Add a Card</button>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "KanbanStrip",
    props: ["board", "card"],
    methods: {
        showAddTask(category) {
            this.$emit("AddCardClick", category)
        },
        showEditTask(data) {
            console.log("EDIT CLICK", data)
            this.$emit("EditCardClick", data)
        },
        deleteTask(id){
            console.log("DELETE CLICK", id)
            this.$emit("DeleteCardClick", id)
        }
    }
}
</script>