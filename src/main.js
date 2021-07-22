import Vue from 'vue';
import App from './App.vue';
import '../public/tailwind.css';
import GSignInButton from 'vue-google-signin-button';

Vue.use(GSignInButton);
Vue.config.productionTip = false;
Vue.prototype.$baseEndpoint = 'https://tolatelo.herokuapp.com';

new Vue({
  render: (createElement) => createElement(App),
}).$mount('#app');
