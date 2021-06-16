const app = new Vue({
  el: '#app',
  data: {
    message: 'I love Vue 3000',
    today: `${new Date().getDate()}-${new Date().toLocaleString('default', { month: 'short' })}`,
    addCard: false,
    title: '',
    tasks: [],
  },
  methods: {
    addTask(category) {
      const task = {
        title: this.title,
        category,
      };
      this.tasks.push({
        title: this.title,
        category,
      });
      console.log(task);
    },
  },
});
