<template>
  <div id="main-page">
    <NavBar @signOut="signOut"></NavBar>
    <main>
      <div class="grid grid-cols-4 gap-6 mt-4 mx-4">
        <Category v-for="cat in categories" :key="cat" :category="cat" :userId="userId"></Category>
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import Category from '../components/Category.vue';

export default {
  name: 'MainPage',
  components: { NavBar, Category },
  props: ['userId'],
  data() {
    return {
      categories: ['backlog', 'todo', 'doing', 'done'],
    };
  },
  methods: {
    signOut() {
      this.$emit('signOut');
    },
  },
};
</script>

<style></style>
