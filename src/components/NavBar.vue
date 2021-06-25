<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <i href="#" id="edit-task" class="fas fa-edit"></i>
          {{title}}
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li v-if="isLogin" class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" @click="logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
    props: ["isLogin"],
    data() {
        return {
            title: "Kanban Board"
        }        
    },
    methods: {
      logout(){
        localStorage.clear();
        this.$emit("checkAuth")
      }
    }
}
</script>