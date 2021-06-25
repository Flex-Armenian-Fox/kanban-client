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
                <div>
                    <i @click="showEditTask(item)" id="edit-task" class="fas fa-edit" data-bs-toggle="modal"
                    data-bs-target="#form-task-modal"></i>
                    <i @click="deleteTask(item.id)" id="delete-task" class="fas fa-trash"></i>
                </div>
                </div>
                <div class="card-body text-secondary">
                <p class="card-text">{{item.title}}</p>
                </div>
            </li>
        </ul>
        <div class="kanban-column-footer">
        <div class="d-grid gap-2">
            <button @click="showAddTask('Backlog')" type="button" class="btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#form-task-modal">Add a Card</button>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "KanbanStrip",
    props: ["board", "card"],
    methods: {
        // showAddTask(category) {
        //     this.$emit("AddCardClick", category)
        // }
    }
}
</script>