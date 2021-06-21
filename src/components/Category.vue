<template>
  <div id="category" class="container">
    <div
      :class="{
        'bg-gray-300 border-gray-300': category == 'backlog',
        'bg-yellow-200 border-yellow-200': category == 'todo',
        'bg-blue-300 border-blue-300': category == 'doing',
        'bg-green-400 border-green-400': category == 'done',
      }"
      class="card"
      @drop="onDrop($event, category)"
      @dragenter.prevent
      @dragover.prevent
    >
      <div class="flex justify-between">
        <p class="font-semibold capitalize">{{ category }}</p>
        <a @click.prevent="addButton(category)" v-if="!add[category]" href="">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            <title>Add task</title>
          </svg>
        </a>
      </div>
      <!-- tasks go here -->

      <div v-for="(task, i) in tasks[category]" :key="task.id" class="content" draggable="true" @dragStart="startDrag($event, task, i)">
        <div :id="`card-${task.category}-${i}`">
          <div class="flex justify-between items-center">
            <p class="text-xs text-gray-500">{{ task.createdAt }}</p>
            <select @change="option(task, i)" v-model="selected" name="option" id="option" class="w-4 outline-none bg-transparent cursor-pointer">
              <option value=""></option>
              <option value="edit">Edit</option>
              <option value="delete">Delete</option>
            </select>
          </div>
          <p :class="`index-${i}`" class="pb-1">{{ task.title }}</p>
          <div class="content-info">
            <p>{{ task.User.email }}</p>
            <a @click.prevent="moveTask(task)" href="" :class="`index-${i}`">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </a>
          </div>
        </div>

        <div :id="`edit-${task.category}-${i}`" class="flex justify-between hidden">
          <form @submit.prevent="editTask(task, i)" class="" action="">
            <input type="text" class="add-input" autofocus required v-model="editedTitle" />
            <button class="add-btn" type="submit">Edit</button>
          </form>

          <a @click.prevent="cancelEdit(task.category, i)" href="">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </a>
        </div>
      </div>

      <!-- new task -->
      <div v-if="add[category]" class="content-add">
        <form @submit.prevent="addTask(category)" class="" action="">
          <input v-model="title" type="text" name="" id="" placeholder="input new task here..." class="add-input" autofocus required />
          <button class="add-btn" type="submit">Add</button>
        </form>

        <a @click.prevent="add[category] = false" href="">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </a>
      </div>

      <!-- add task -->
      <div @click.prevent="add[category] = true" v-if="!add[category]" class="add">
        <p>Add new task . . .</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Category',
  props: ['category'],
  data() {
    return {
      message: 'I love Vue 3000',
      today: `${new Date().getDate()}-${new Date().toLocaleString('default', { month: 'short' })}`,
      add: {
        backlog: false,
        todo: false,
        doing: false,
        done: false,
      },
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
    };
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
      // this.tasks[category].push({
      //   title: this.title,
      //   category,
      // });

      // this.add[category] = false;
      // this.title = '';

      const data = {
        title: this.title,
        category,
      };
      fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjIzNDcxNjk1fQ.QIvKNH4Dwex7Zl3CHqYEom7aeooHlVb724597C07zhs',
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res.data);
          res.data.createdAt = this.dateFormat(res.data.createdAt);
          this.tasks[res.data.category].push(res.data);
          this.add[category] = false;
          this.title = '';
        });
    },
    deleteTask(task) {
      // this.tasks[category] = this.tasks[category].filter((el) => el.title != title);

      const { category, id } = task;

      this.tasks[category] = this.tasks[category].filter((el) => el.id != id);

      fetch('http://localhost:3000/tasks/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjIzNDcxNjk1fQ.QIvKNH4Dwex7Zl3CHqYEom7aeooHlVb724597C07zhs',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
        });
    },
    moveTask(task) {
      const { category, id } = task;

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
      if (category == 'backlog') newCategory = 'todo';
      else if (category == 'todo') newCategory = 'doing';
      else if (category == 'doing') newCategory = 'done';
      if (category != 'done') {
        this.tasks[newCategory].push(task);
      } else {
        this.deleteTask(task);
      }

      const data = {
        category: newCategory,
      };
      // console.log(data);
      fetch('http://localhost:3000/tasks/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjIzNDcxNjk1fQ.QIvKNH4Dwex7Zl3CHqYEom7aeooHlVb724597C07zhs',
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.tasks[category] = this.tasks[category].filter((el) => el.id != id);
          console.log(res);
        });
    },
    editTask(task, i) {
      const { category, id } = task;

      const data = {
        title: this.editedTitle,
      };
      // console.log(data);
      fetch('http://localhost:3000/tasks/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjIzNDcxNjk1fQ.QIvKNH4Dwex7Zl3CHqYEom7aeooHlVb724597C07zhs',
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          this.tasks[category][i].title = this.editedTitle;
          this.editedTitle = '';
          document.querySelector(`#edit-${category}-${i}`).style.display = 'none';
          document.querySelector(`#card-${category}-${i}`).style.display = 'block';
          this.edit[category].splice(0, 1);
        });
    },
    cancelEdit(category, i) {
      this.editedTitle = '';
      document.querySelector(`#edit-${category}-${i}`).style.display = 'none';
      document.querySelector(`#card-${category}-${i}`).style.display = 'block';
    },
    option(task, i) {
      const { category, title } = task;
      if (this.selected == 'delete') {
        this.deleteTask(task);
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
    startDrag(event, task, i) {
      const { category } = task;

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
      this.deleteTask(movedTask);
    },

    // connect to server
    fetchData() {
      return fetch('http://localhost:3000/tasks', {
        method: 'GET',
        headers: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjIzNDcxNjk1fQ.QIvKNH4Dwex7Zl3CHqYEom7aeooHlVb724597C07zhs',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          return res.data;
        });
    },

    dateFormat(date) {
      return `${new Date(date).getDate()}-${new Date(date).toLocaleString('default', { month: 'short' })}`;
    },
  },
  async created() {
    console.log(await this.fetchData());
    try {
      let tasks = await this.fetchData();
      tasks.map((el) => {
        el.createdAt = this.dateFormat(el.createdAt);
        this.tasks[el.category].push(el);
      });
    } catch (error) {
      console.log(error);
    }
    // console.log(JSON.parse(JSON.stringify(this.tasks)));
  },
};
</script>

<style></style>
