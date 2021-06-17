const app = new Vue({
  el: '#app',
  data: {
    message: 'I love Vue 3000',
    today: `${new Date().getDate()}-${new Date().toLocaleString('default', { month: 'short' })}`,
    add: {
      backlog: false,
      todo: false,
      doing: false,
      done: false,
    },
    // addBacklog: false,
    // addTodo: false,
    // addDoing: false,
    // addDone: false,
    title: '',
    tasks: {
      backlog: [],
      todo: [],
      doing: [],
      done: [],
    },
    selected: '',
    edit: {
      backlog: false,
      todo: false,
      doing: false,
      done: false,
    },
  },
  methods: {
    addButton(category) {
      this.add[category] = true;
      for (const cat in this.add) {
        if (cat != category) this.add[cat] = false;
      }
    },
    addTask(category) {
      // function capitalize(string) {
      //   return 'add' + string.charAt(0).toUpperCase() + string.slice(1);
      // }

      this.tasks[category].push({
        title: this.title,
        category,
      });

      this.add[category] = false;
      this.title = '';
      // console.log(task);
    },
    deleteTask(title, category) {
      this.tasks[category] = this.tasks[category].filter((el) => el.title != title);
    },
    moveTask(title, category) {
      let newCategory;
      // console.log(title, category);
      if (category == 'backlog') newCategory = 'todo';
      else if (category == 'todo') newCategory = 'doing';
      else if (category == 'doing') newCategory = 'done';
      if (category != 'done') {
        this.tasks[newCategory].push({
          title,
          category: newCategory,
        });
      }
      this.deleteTask(title, category);
    },
    editTask() {},
    option(title, category) {
      if (this.selected == 'delete') {
        this.deleteTask(title, category);
      } else if ((this.selected = 'edit')) {
        this.edit[category] = true;
      }
      this.selected = '';
    },
  },
});
