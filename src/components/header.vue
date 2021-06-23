<template>
  <header>
    <div class="navbar navbar-dark bg-dark box-shadow">
            <div class="container d-flex justify-content-between">
            <a href="#" class="navbar-brand d-flex align-items-center">
                <strong>Kanban</strong>
            </a>
            <div class="ml-auto" id="top-btns">
                <button class="btn btn-success" @click="formNew = 1">New Task</button>
                <button class="btn btn-danger" onClick="logout()">Logout</button>
            </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {

}
</script>

<style>

</style>