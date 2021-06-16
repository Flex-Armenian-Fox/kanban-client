const dummyEmail = 'anton@mail.com'
const dummyPassword = '1234'
let dummyTask = [
    {
        id: 1,
        fullname: 'Jhon Smithsonian',
        email: 'jhon.smithsonian@mail.com',
        task_detail: 'Melanjutkan coding front end dengan vueJS',
        category: 'backlog'
    },
    {
        id: 2,
        fullname: 'Jhon Denver',
        email: 'jhon.denver@mail.com',
        task_detail: 'Melanjutkan coding backend dengan express',
        category: 'todo'
    },
    {
        id: 3,
        fullname: 'Jhon Cenaaaaa',
        email: 'jhon.cenasmackdown@mail.com',
        task_detail: 'Berkelahi dengan undertaker',
        category: 'backlog'
    },
    {
        id: 4,
        fullname: 'Jhon Thor',
        email: 'jhon.thor@mail.com',
        task_detail: 'Memberi makan ikan di dalam kolam tetangga atas persetujuan tetangga dan ikan milik tetangga yang sangat bagus warnanya',
        category: 'done'
    },
    {
        id: 5,
        fullname: 'Jhon Thornado',
        email: 'jhon.thornado@mail.com',
        task_detail: 'Memberi makan ikan di dalam kolam tetangga atas persetujuan tetangga dan ikan milik tetangga yang sangat bagus warnanya',
        category: 'done'
    },
    {
        id: 6,
        fullname: 'Jhon Kanban',
        email: 'jhon.kanban@mail.com',
        task_detail: 'Memberi makan ikan di dalam kolam tetangga atas persetujuan tetangga dan ikan milik tetangga yang sangat bagus warnanya',
        category: 'done'
    }
]

const app = new Vue({
    el: "#app",
    data: {
        isLogin: localStorage.getItem("loggedIn"),
        formLogin: {
            email: "",
            password: ""
        },
        dummyTask,
        backlogs: dummyTask.filter(el => el.category == 'backlog'),
        todos: dummyTask.filter(el => el.category == 'todo'),
        doings: dummyTask.filter(el => el.category == 'doing'),
        dones: dummyTask.filter(el => el.category == 'done'),
        isData: true,
        task: {
            id: dummyTask.length + 1,
            fullname: "",
            email: "",
            task_name: "",
            task_detail: "",
            category: "backlog"
        }
    },
    methods: {
        login: function() {
            const { email, password } = this.formLogin
            if (email == dummyEmail && password == dummyPassword) {
                localStorage.setItem("loggedIn", true)
                this.isLogin = true
                this.formLogin.email = ""
                this.formLogin.password = ""
            }
        },
        logout: function() {
            this.isLogin = false
            localStorage.clear()
        },

        addTask: function() {
            const { id, fullname, email, task_detail, category } = this.task
            this.dummyTask.push({ id, fullname, email, task_detail, category })
            this.backlogs = dummyTask.filter(el => el.category == 'backlog')
            this.todos = dummyTask.filter(el => el.category == 'todo')
            this.doings = dummyTask.filter(el => el.category == 'doing')
            this.dones = dummyTask.filter(el => el.category == 'done')
            this.isData = true
            this.task.id = ""
            this.task.fullname = ""
            this.task.email = ""
            this.task.task_name = ""
            this.task.task_detail = ""
            this.task.category = ""
        }
    }
})