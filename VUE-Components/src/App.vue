
// ======= TEMPLATE (HTML) =======
<template>
  <div>

      <!-- START - NAVBAR LOGGED IN -->
      <section v-if="currentPage === 'homepage'">
        <div class="relative pt-6 px-4 sm:px-6 lg:px-8">
          <nav class="flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
            <div class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
              <div class="flex items-center justify-between w-full md:w-auto">
                <a href="#">
                  <span class="sr-only">Kanban</span>
                  <img class="h-16 w-auto sm:h-14" :src="NavbarLogo">
                </a>
              </div>
            </div>
            <div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
              <a href="#" @click="currentPage === 'homepage'" class="font-medium text-gray-200 hover:text-gray-400">My Kanban</a>
              <a href="#" @click.prevent="logout" class="font-medium text-yellow-500 hover:text-yellow-400">Log out</a>
            </div>
          </nav>
        </div>
      </section>
      <!-- END - NAVBAR LOGGED IN -->

    <LandingPage v-if="currentPage === 'login' || currentPage === 'register'" @ubahCurrentPage="ubahCurrentPage" :currentPageStatus="currentPage"> </LandingPage>
    
    <KanbanPage v-else-if="currentPage === 'homepage'"> </KanbanPage>
  </div>
</template>

// ======= SCRIPT (JS) =======
<script>

  import LandingPage from './views-pages/Landing.vue'
  import KanbanPage from './views-pages/Kanban.vue'
  import NavbarLogo from './img/Kanban-Logo-03.png'

  export default {
    components: { // ini isi COMPONENTS import-an dari tempat lain
      LandingPage,
      KanbanPage,
    },
    data() {
      return { // kalo ini isi DATA2 import-an DAN yg di-define di sini (yg bukan COMPONENTS)
          currentPage: '',
          NavbarLogo
      }
    },
    methods: {
      ubahCurrentPage(page) {
        console.log('MASUK - UbahCurrentPage')
        this.currentPage = page
        console.log('CURRENT PAGE =>', this.currentPage)
        this.checkAuthentication()
      },
      logout() {
        console.log('MASUK - Logout')
        localStorage.clear()
        this.checkAuthentication()
      },
      checkAuthentication() {
        if (localStorage.getItem('accesstoken')) {
          this.currentPage = 'homepage'
        } else {
          this.currentPage = 'login'
        }
      }
    },
    created() {
      console.log('MASUK - Created')
      this.checkAuthentication()
    }
    
  }

</script>

// ======= SCRIPT (CSS) =======
<style scoped></style>