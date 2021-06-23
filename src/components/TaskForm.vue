<template>
  <div v-if="formNew" @submit.prevent="postTask()" class="w-50 rounded-lg bg-dark p-3 my-2 justify-content-center mx-auto">
        <div class="text-3xl text-bold text-white uppercase ml-2 my-2">New Task</div>
        <form id="new-task" class="">
            <label class="text-bold text-white uppercase mx-auto my-1">Task Name:</label> <br>
            <input class="form-control input-sm" type="text" v-model="newName">
            <label class="text-bold text-white uppercase mx-auto my-1">Deadline:</label> <br>
            <input class="form-control input-sm" type="date" v-model="newDate">
            <label class="text-bold text-white uppercase mx-auto my-1">Category:</label> <br>
            <select class="form-control input-sm" v-model="newCat">
                <option value="backlog" selected>Backlog</option>
                <option value="todo">To do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
            </select>
            <br>
            <button type="submit" class="btn btn-primary">submit</button>
            <button class="btn btn-secondary float-right" @click="formNew = 0">back</button>
        </form>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>