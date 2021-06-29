'use strict'

const app = new Vue({
    el: '#app', // root element
    data: {
        login: true,
        currentPage: "homepage",
        addNew_backlog: false,
        addNew_todo: false,
        addNew_doing: false,
        addNew_done: false,
        editTask_done: false,
        tasks: [
            {
                id: 1,
                title: 'Bayar invoice',
                description: 'Air & listrik Juni',
                due_date: new Date('2021-06-31'),
                category: 'backlog'
            },
            {
                id: 2,
                title: 'Kerjain JS Racer',
                description: '2 functions aja',
                due_date: new Date('2021-06-21'),
                category: 'todo'
            },
            {
                id: 3,
                title: 'Masak nasi',
                description: '4 orang',
                due_date: new Date('2021-06-22'),
                category: 'doing'
            },
            {
                id: 4,
                title: 'Review MVC',
                description: '',
                due_date: new Date('2021-06-25'),
                category: 'done'
            },
            {
                id: 5,
                title: 'Beli obat pel sama kapur barus',
                description: 'masing2 x2 pak',
                due_date: new Date('2021-07-01'),
                category: 'todo'
            },
        ],
        formDueDate: '',
        newTask: {
            title: '',
            description: '',
            due_date: '',
            category: ''
        }
    },
    methods: {
        addNewTask(category) {
            this.newTask.id = this.tasks.length + 1
            this.newTask.due_date = new Date(this.formDueDate)
            this.newTask.category = category
            this.tasks.push(this.newTask)
            this.newTask = {
                title: '',
                description: '',
                due_date: '',
                category: ''
            }
            this.formDueDate = ''
        },
        showForm_backlog() {
            this.addNew_backlog = true
        },
        showForm_todo() {
            this.addNew_todo = true
        },
        showForm_doing() {
            this.addNew_doing = true
        },
        showForm_done() {
            this.addNew_done = true
        },
        hideForm_backlog() {
            this.addNew_backlog = false
        },
        hideForm_todo() {
            this.addNew_todo = false
        },
        hideForm_doing() {
            this.addNew_doing = false
        },
        hideForm_done() {
            this.addNew_done = false
        },
        logout() {
            this.login = false
            this.currentPage = 'login'
        },
        dueDate_formatter(date_input) {
            let array = date_input.toDateString().toUpperCase().split(' ')
            let result = `${array[2]} ${array[1]} ${array[3]}`
            return result
            // for (let i = 0; i < array.length; i++) {
            //     result += array[i]
            //     if (i === 0 || i === 2) result += ', '
            //     else if (i === array.length-1) break
            //     else result += ' '
            // }
        },
        deleteTask(id_string) {
            let id = +id_string
            let newTasks = this.tasks.filter(el => el.id !== id)
            this.tasks = newTasks
        }
    }
})