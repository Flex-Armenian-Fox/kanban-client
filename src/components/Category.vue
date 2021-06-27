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

      <div
        v-for="(task, i) in categorizedTasks[category]"
        :key="task.id"
        class="content"
        :draggable="{ true: userId == task.UserId, false: userId != task.UserId }"
        @dragstart="startDrag($event, task.id)"
      >
        <div :id="`card-${task.category}-${i}`">
          <div class="flex justify-between items-center">
            <p class="text-xs text-gray-500">{{ task.createdAt }}</p>
            <select
              v-if="userId == task.UserId"
              @change="option(task, i)"
              v-model="selected"
              name="option"
              id="option"
              class="w-4 outline-none bg-transparent cursor-pointer"
            >
              <option value=""></option>
              <option value="edit">Edit</option>
              <option value="delete">Delete</option>
            </select>
          </div>
          <p :class="`index-${i}`" class="pb-1">{{ task.title }}</p>
          <div class="content-info">
            <p>{{ task.User.email }}</p>
            <a v-if="userId == task.UserId" @click.prevent="moveTask(task)" href="" :class="`index-${i}`">
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
  props: ['category', 'userId'],
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
      tasks: [],
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
  computed: {
    categorizedTasks() {
      let categorized = {};
      // console.log(JSON.parse(JSON.stringify(this.tasks)));
      this.tasks.forEach((el) => {
        el.createdAt = this.dateFormat(el.createdAt);
        if (categorized[el.category] == undefined) categorized[el.category] = [];
        categorized[el.category].push(el);
      });
      this.fetchData();
      return categorized;
    },
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
      const data = {
        title: this.title,
        category,
      };
      fetch('https://tolatelo.herokuapp.com/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: JSON.parse(localStorage.getItem('access_token')),
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this.add[category] = false;
          this.title = '';
          console.log(res);
        });
    },
    deleteTask(id) {
      fetch('https://tolatelo.herokuapp.com/tasks/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          access_token: JSON.parse(localStorage.getItem('access_token')),
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
      else if (category == 'done') this.deleteTask(task.id);

      const data = {
        category: newCategory,
      };
      fetch('https://tolatelo.herokuapp.com/tasks/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          access_token: JSON.parse(localStorage.getItem('access_token')),
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
        });
    },
    editTask(task, i) {
      const { category, id } = task;

      const data = {
        title: this.editedTitle,
      };
      fetch('https://tolatelo.herokuapp.com/tasks/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          access_token: JSON.parse(localStorage.getItem('access_token')),
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
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
      const { category, id } = task;
      if (this.selected == 'delete') {
        this.deleteTask(id);
      } else if ((this.selected = 'edit')) {
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
        this.tasks.forEach((el) => {
          if (el.id == id) {
            this.editedTitle = el.title;
          }
        });
      }
      this.selected = '';
    },

    // drag and frop
    startDrag(event, id) {
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('movedId', id);
    },

    onDrop(event, category) {
      console.log(event);
      const movedId = event.dataTransfer.getData('movedId');

      const data = {
        category,
      };
      fetch('https://tolatelo.herokuapp.com/tasks/' + movedId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          access_token: JSON.parse(localStorage.getItem('access_token')),
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
        });
    },

    // connect to server
    fetchData() {
      fetch('https://tolatelo.herokuapp.com/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          access_token: JSON.parse(localStorage.getItem('access_token')),
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          // console.log(res);
          this.tasks = res.data;
        })
        .catch((err) => console.log(err));
    },

    dateFormat(date) {
      return `${new Date(date).getDate()}-${new Date(date).toLocaleString('default', { month: 'short' })}`;
    },
  },
  created() {
    this.fetchData();
    // console.log(JSON.parse(JSON.stringify(this.tasks)));
  },
};
</script>

<style></style>
