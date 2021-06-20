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
    editedTitle: '',
    selected: '',
    edit: {
      backlog: [],
      todo: [],
      doing: [],
      done: [],
    },
    // edit: ['backlog', 'todo', 'doing', 'done'],
  },
  methods: {
    addButton(category) {
      this.add[category] = true;
      for (const cat in this.add) {
        if (cat != category) this.add[cat] = false;
      }
      for (const cat in this.edit) {
        if (this.edit[cat].length > 0) {
          this.cancelEdit(cat, this.edit[cat][0]);
          this.edit[cat].splice(0, 1);
        }
      }
    },
    addTask(category) {
      this.tasks[category].push({
        title: this.title,
        category,
      });

      this.add[category] = false;
      this.title = '';
    },
    deleteTask(title, category) {
      this.tasks[category] = this.tasks[category].filter((el) => el.title != title);
    },
    moveTask(title, category) {
      for (const cat in this.add) {
        if (this.add[cat]) this.add[cat] = false;
      }
      for (const cat in this.edit) {
        if (this.edit[cat].length > 0) {
          this.cancelEdit(cat, this.edit[cat][0]);
          this.edit[cat].splice(0, 1);
        }
      }
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
    editTask(category, i) {
      this.tasks[category][i].title = this.editedTitle;
      this.editedTitle = '';
      document.querySelector(`#edit-${category}-${i}`).style.display = 'none';
      document.querySelector(`#card-${category}-${i}`).style.display = 'block';
      this.edit[category].splice(0, 1);
    },
    cancelEdit(category, i) {
      this.editedTitle = '';
      document.querySelector(`#edit-${category}-${i}`).style.display = 'none';
      document.querySelector(`#card-${category}-${i}`).style.display = 'block';
    },
    option(title, category, i) {
      if (this.selected == 'delete') {
        this.deleteTask(title, category);
      } else if ((this.selected = 'edit')) {
        // this.edit[category] = true;
        // console.log(this.$refs[`index-${i}`]);
        // this.$refs[`index-${i}`].style.display = 'block';
        for (const cat in this.add) {
          if (this.add[cat]) this.add[cat] = false;
        }
        this.edit[category].push(i);
        if (this.edit[category].length > 1) {
          this.cancelEdit(category, this.edit[category][0]);
          this.edit[category].splice(0, 1);
        }
        for (const cat in this.edit) {
          if (this.edit[cat].length > 0 && cat != category) {
            this.cancelEdit(cat, this.edit[cat][0]);
            this.edit[cat].splice(0, 1);
          }
        }
        // console.log(JSON.parse(JSON.stringify(this.edit[category])));
        document.querySelector(`#edit-${category}-${i}`).style.display = 'flex';
        document.querySelector(`#card-${category}-${i}`).style.display = 'none';
        this.editedTitle = this.tasks[category][i].title;
      }
      this.selected = '';
    },

    // drag and frop
    startDrag(event, category, i) {
      // console.log(event);
      // console.log(category, i);
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('movedCategory', category);
      event.dataTransfer.setData('movedIndex', i);
    },

    onDrop(event, category) {
      const movedCategory = event.dataTransfer.getData('movedCategory');
      const movedIndex = event.dataTransfer.getData('movedIndex');
      console.log(movedCategory, movedIndex);
      const movedTask = this.tasks[movedCategory][movedIndex];
      this.title = movedTask.title;
      this.addTask(category);
      this.deleteTask(movedTask.title, movedTask.category);
    },
  },
});
