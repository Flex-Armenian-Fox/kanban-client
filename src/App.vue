<template>
  <div>
    <SignInPage v-if="!isSignIn" @loginId="loginId" @auth="auth"></SignInPage>
    <MainPage v-if="isSignIn" @signOut="signOut" :userId="userId"></MainPage>
  </div>
</template>

<script>
import MainPage from './views/MainPage.vue';
import SignInPage from './views/SignInPage.vue';

export default {
  name: 'App',
  components: { MainPage, SignInPage },
  data() {
    return {
      message: 'I love Vue 3000',
      isSignIn: false,
      userId: '',
    };
  },
  methods: {
    auth() {
      if (localStorage.access_token) {
        this.isSignIn = true;
      } else {
        this.isSignIn = false;
      }
    },
    loginId(id) {
      this.userId = +id;
    },
    signOut() {
      localStorage.clear();
      this.auth();
    },
  },
  created() {
    this.auth();
  },
};
</script>

<style></style>
