const app = new Vue({
    el: "#app",
    data: {
        serverUrl: 'http://localhost:3000/api',
        isLogin: localStorage.getItem("access_token"),
        formLogin: {
            email: "",
            password: ""
        },
        formRegister: {
            email: "",
            password: "",
            fullname: "",            
        },
        submitted: false,
        dummyTask: [],
        isData: true,        
        formEdit: {
            taskId: 0,
            taskTitle: "",
            taskDetail: "",
            taskCategory: "",
            toggleEditModal: false,
        },
        loginState: {
            loginMessage: "",
            registerMessage: "",
            isRegister: false
        }
    },    
    methods: {        
        emptyForm: function() {
            this.formLogin.email = ""
            this.formLogin.password = ""
            this.formRegister.email = ""
            this.formRegister.password = ""
            this.formRegister.fullname = ""
            this.formEdit.taskId =  0
            this.formEdit.taskTitle = ""
            this.formEdit.taskDetail = ""
            this.formEdit.taskCategory = ""
        },

        cancel: function() {
            this.loginState.isRegister = false
            this.emptyForm()
        },

        fetchData: function() {
            this.isData = true
            const access_token = localStorage.getItem('access_token')
            axios({
                method: 'GET',
                url: `${this.serverUrl}/tasks`,
                headers: { access_token }
            })
            .then(res => {
                const { data: tasks } = res.data
                this.dummyTask = tasks
            })
            .catch(err => {
                console.log("error fetchData", err);
            })
        },

        register: function() {
            this.submitted = true
            axios({
                method: 'POST',
                url: `${this.serverUrl}/users/register`,
                data: {
                    email: this.formRegister.email,
                    password: this.formRegister.password,
                    full_name: this.formRegister.fullname
                }                
            })
            .then(() => {
                swal("Register Succes", "Register New User Success, you will be redirected to login page", "success")
                this.submitted = false
                this.loginState.isRegister = false
                this.emptyForm()
            })
            .catch(err => {
                console.log("error register", err.response.data);
                const { error } = err.response.data
                this.loginState.registerMessage = error.message
                this.submitted = false
            })
        },

        login: function() {
            axios({
                method: 'POST',
                url: `${this.serverUrl}/users/login`,
                data: {
                    email: this.formLogin.email,
                    password: this.formLogin.password
                }
            })
            .then(res => {
                const { data } = res.data
                localStorage.setItem("access_token", data.access_token)
                this.isLogin = true
                this.emptyForm()
                this.fetchData()
            })
            .catch(err => {
                console.log("error login", err.response);
                const { error } = err.response.data
                this.isLogin = false
                this.loginState.loginMessage = error.message
            })
        },

        logout: function() {
            this.isLogin = false
            localStorage.clear()
            this.emptyForm()
        },

        showEdit: function(data) {
            this.formEdit.toggleEditModal = true
            axios({
                method: 'GET',
                url: `${this.serverUrl}/tasks/${data.id}`,
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
            .then(res => {
                const { data:task } = res.data
                this.formEdit.taskId = task.id
                this.formEdit.taskTitle = task.title
                this.formEdit.taskDetail = task.task_detail
                this.formEdit.taskCategory = task.category
            })
            .catch(err => {
                console.log("error showEdit", err)
            })
        },

        editData: function() {
            this.submitted = true
            axios({
                method: 'PUT',
                url: `${this.serverUrl}/tasks/${this.formEdit.taskId}`,
                data: {
                    title: this.formEdit.taskTitle,
                    task_detail: this.formEdit.taskDetail,
                    category: this.formEdit.taskCategory
                },
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
            .then(() => {
                swal("Success", "Update Success", "success")
                this.formEdit.toggleEditModal = false
                this.submitted = false
                this.emptyForm()
                this.fetchData()
            })
            .catch(err => {
                console.log("error editData", err);
                const { error } = err.response.data
                this.submitted = false
                swal("Error", `${error.message}`, "error")
            })                 
        },

        deleteData: function(id, title) {
            swal({
                title: "Are you sure?",
                text: `Delete task ${title}`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((confirmDelete) => {
                if (confirmDelete) {
                    axios({
                        method: 'DELETE',
                        url: `${this.serverUrl}/tasks/${id}`,
                        headers: {
                            access_token: localStorage.getItem("access_token")
                        }
                    })
                    .then(() => {
                        swal("Success", "Task Deleted", "success")
                        this.fetchData()
                    })
                    .catch(err => {
                        console.log("error deleteData", err)
                        const { error } = err.response.data                                        
                        swal("Error", `${error.message}`, "error")
                    })
                }
            });
        },

        addTask: function() {
            this.submitted = true
            const { task_name, task_detail, category } = this.formAdd
            axios({
                method: 'POST',
                url: `${this.serverUrl}/tasks`,
                data: {
                    title: task_name,
                    task_detail: task_detail,
                    category: category
                },
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
            .then(() => {
                swal("Success", "Success Add New Data", "success");
                this.isData = true
                this.submitted = false
                this.fetchData()
                this.emptyForm()
            })
            .catch(err => {
                console.log("error addTask", err);
            })
            
        },

        changeCategory: function(id, category) {
            axios({
                method: 'PATCH',
                url: `${this.serverUrl}/tasks/${id}`,
                data: { category },
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
            .then(res => {
                console.log("response changeCategory", res);
                this.fetchData()
            })
            .catch(err => {
                console.log("error changeCategory", err);
                const { error } = err.response.data                                        
                swal("Error", `${error.message}`, "error")
                this.fetchData()
            })
        }
    },
    created: function() {
        if (this.isLogin) {
            this.fetchData()
        }
    },
    computed: {
        allTasks() {
            return {
                backlogs: this.dummyTask.filter(el => el.category == 'backlog'),
                todos: this.dummyTask.filter(el => el.category == 'todo'),
                doings: this.dummyTask.filter(el => el.category == 'doing'),
                dones: this.dummyTask.filter(el => el.category == 'done')
            }
        },

        formAdd() {
            return {                
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