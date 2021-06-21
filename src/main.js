import Vue from 'vue';
import App from './App.vue';
import '../public/tailwind.css';

new Vue({
  render: (createElement) => createElement(App),
}).$mount('#app');
