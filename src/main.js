import Vue from 'vue';
import App from './App.vue';
import '../public/tailwind.css';
// import GAuth from 'vue-google-oauth2';
// import GoogleSignInButton from 'vue-google-signin-button-directive';

// Vue.config.productionTip = false;
Vue.prototype.$baseEndpoint = 'https://tolatelo.herokuapp.com';

new Vue({
  GoogleSignInButton,
  render: (createElement) => createElement(App),
}).$mount('#app');

// const gauthOption = {
//   clientId: '1051183172531-s8ohs07adecklgfcsdsapel94ifgratg.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'select_account',
// };
// Vue.use(GAuth, gauthOption);
