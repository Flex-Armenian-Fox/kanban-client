const app = new Vue({
    el: "#app",
    data: {
        isLogin: localStorage.getItem("loggedIn"),
        formLogin: {
            email: "",
            password: ""
        },
        dummyEmail: 'anton@mail.com',
        dummyPassword: '1234',
        dummyTask: [
            {
                id: 1,
                fullname: 'Jhon Smithsonian',
                email: 'jhon.smithsonian@mail.com',
                task_name: 'coding front end',
                task_detail: 'Melanjutkan coding front end dengan vueJS',
                category: 'backlog'
            },
            {
                id: 2,
                fullname: 'Jhon Denver',
                email: 'jhon.denver@mail.com',
                task_name: 'coding backend',
                task_detail: 'Melanjutkan coding backend dengan express',
                category: 'todo'
            },
            {
                id: 3,
                fullname: 'Jhon Cenaaaaa',
                email: 'jhon.cenasmackdown@mail.com',
                task_name: 'berkelahi',
                task_detail: 'Berkelahi dengan undertaker',
                category: 'backlog'
            },
            {
                id: 4,
                fullname: 'Jhon Thor',
                email: 'jhon.thor@mail.com',
                task_name: 'memberi makan',
                task_detail: 'Memberi makan ikan gabus',
                category: 'done'
            },
            {
                id: 5,
                fullname: 'Jhon Thornado',
                email: 'jhon.thornado@mail.com',
                task_name: 'memberi makan',
                task_detail: 'Memberi makan ikan lele',
                category: 'done'
            },
            {
                id: 6,
                fullname: 'Jhon Kanban',
                email: 'jhon.kanban@mail.com',
                task_name: 'memberi makan',
                task_detail: 'Memberi makan ikan paus biru',
                category: 'done'
            }
        ],                
        isData: true,        
        formEdit: {
            taskId: 0,
            taskTitle: "",
            taskDetail: "",
            taskCategory: "",
            toggleEditModal: false,
        }        
    },
    methods: {        
        login: function() {
            const { email, password } = this.formLogin
            if (email == this.dummyEmail && password == this.dummyPassword) {
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
        showEdit: function(data) {
            this.formEdit.toggleEditModal = true
            this.formEdit.taskId = data.id
            this.formEdit.taskTitle = data.task_name
            this.formEdit.taskDetail = data.task_detail
            this.formEdit.taskCategory = data.category
        },
        editData: function() {
            this.dummyTask.map(el => {
                if (el.id == this.formEdit.taskId) {
                    console.log("el", el);
                    el.task_name = this.formEdit.taskTitle
                    el.task_detail = this.formEdit.taskDetail
                    el.category = this.formEdit.taskCategory

                    return el
                }                
            })
            this.formEdit.toggleEditModal = false
        },
        deleteData: function(id) {
            this.dummyTask = this.dummyTask.filter(el => el.id !== id)
        },
        addTask: function() {
            const { id, fullname, email, task_name, task_detail, category } = this.formAdd
            this.dummyTask.push({ id, fullname, email, task_name, task_detail, category })
            this.isData = true
            this.formAdd.id = ""
            this.formAdd.fullname = ""
            this.formAdd.email = ""
            this.formAdd.task_name = ""
            this.formAdd.task_detail = ""
            this.formAdd.category = ""
        },
        changeCategory: function(id, category) {
            console.log("id nya", id);
            console.log("category nya", category);
            this.dummyTask.map(el => {
                if (el.id == id) {                                        
                    el.category = category
                    return el
                }   
            })
        }
    },
    computed: {
        tasks() {
            return {
                backlogs: this.dummyTask.filter(el => el.category == 'backlog'),
                todos: this.dummyTask.filter(el => el.category == 'todo'),
                doings: this.dummyTask.filter(el => el.category == 'doing'),
                dones: this.dummyTask.filter(el => el.category == 'done')
            }
        },
        formAdd() {
            return {
                id: this.dummyTask.length + 1,
                fullname: "",
                email: "",
                task_name: "",
                task_detail: "",
                category: "backlog"
            }
        },
        categories() {
            return ['backlog', 'todo', 'doing', 'done']
        }
    }
})