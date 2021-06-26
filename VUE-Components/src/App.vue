
// ======= TEMPLATE (HTML) =======
<template>
  <div>
    <LandingPage v-if="currentPage === 'login'" @ubahCurrentPage="ubahCurrentPage" :currentPageStatus="currentPage"> </LandingPage>
    <KanbanPage v-else-if="currentPage === 'homepage'"> </KanbanPage>
  </div>
</template>

// ======= SCRIPT (JS) =======
<script>

  import LandingPage from './views-pages/Landing.vue'
  import KanbanPage from './views-pages/Kanban.vue'

  export default {
    components: {
      LandingPage,
      KanbanPage
    },
    data() {
      return {
          currentPage: 'login'
      }
    },
    methods: {
      ubahCurrentPage (page) {
        console.log('MASUK - UbahCurrentPage')
        this.currentPage = page
      }
    },
    created () {
      console.log('MASUK - Created')
      if (localStorage.getItem('accesstoken')) {
        this.currentPage = 'homepage'
      } else {
        this.currentPage = 'login'
      }
    }
  }

</script>

// ======= SCRIPT (CSS) =======
<style scoped></style>