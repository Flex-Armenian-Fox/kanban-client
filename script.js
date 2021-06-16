const dummyEmail = 'anton@mail.com'
const dummyPassword = '1234'
const dummyTask = [
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
    }
]
const backlogs = dummyTask.filter(el => el.category == 'backlog')
const todos = dummyTask.filter(el => el.category == 'todo')
const doings = dummyTask.filter(el => el.category == 'doing')
const dones = dummyTask.filter(el => el.category == 'done')

console.log("backlogs", backlogs);

const app = new Vue({
    el: "#app",
    data: {
        isLogin: localStorage.getItem("loggedIn"),
        formLogin: {
            email: "",
            password: ""
        },
        backlogs: backlogs,
        todos: todos,
        doings: doings,
        dones: dones,
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
        }
    }
})