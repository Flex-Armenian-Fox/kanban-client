<template>
    <div class="modal fade" id="form-task-modal" tabindex="-1" aria-labelledby="form-task-ModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ModalLabel">Add New Task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="task-text" class="col-form-label">Task:</label>
                <textarea v-model="taskData.title" class="form-control" id="task-text"></textarea>
              </div>
              <select v-model="taskData.category" class="form-select" aria-label="Kanban Location">
                <option selected>Kanban Location</option>
                <option value="Backlog">Backlog</option>
                <option value="Product">Product</option>
                <option value="Development">Development</option>
                <option value="Done">Done</option>
              </select>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button @click="addTask()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props: ["data"],
    name: "Form-Data",
    data() {
      return {
        taskData: {
          title: '',
          category: ''
        },
        show: true
      }
    },
    methods: {
        addTask() {
            this.$emit("taskData", taskData)
        }
    }
}
</script>