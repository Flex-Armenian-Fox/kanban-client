let baseUrl = "http://localhost:3000";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJidWRpZ2tAZ21haWwuY29tIiwiaWF0IjoxNjI0MjcxMDExfQ.fX3O5fCVffLR6a5Krsr9FLWMP3FYvE8kgu1nn6pjTlo";

const app = new Vue({
    el:"#app",
    data:{
        title: "Kanban Board",
        tasks: [],
        taskData: {
            title: "",
            category: "",
            id: 0
        }
    },
    methods: {
        fetchData(){
            axios({
                method: "GET",
                url: baseUrl + "/tasks",
                headers: {
                    access_token: token
                }
            })
            .then(respon => {
                this.tasks = respon.data

                console.log(this.tasks)
            })
            .catch(err => {
                console.log(err)
            })
        },
        getData(category){
            return this.tasks.filter(el => el.category == category)
        },
        showAddTask(category){
            console.log("RUN")
            this.taskData.title =  "",
            this.taskData.category = category,
            this.taskData.id = 0
            
        },
        showEditTask(data){
            console.log("RUN")
            this.taskData.title = data.title,
            this.taskData.category = data.category,
            this.taskData.id = data.id
        },
        addTask(){
            console.log(baseUrl)
            let methodType;
            let urlAxios;

            if (this.taskData.id == 0){
                methodType = "POST"
                urlAxios = baseUrl + "/tasks"
            } else {
                methodType = "PUT"
                urlAxios = baseUrl + "/tasks/" + this.taskData.id
            }    
            console.log(methodType, urlAxios)
            axios({
                method: methodType,
                url: urlAxios,
                headers: {
                    access_token: token
                },
                data: {
                    title: this.taskData.title,
                    category: this.taskData.category
                }
            })
            .then(respon => {
                this.fetchData();
                // this.taskData = "";

                console.log("CreatedOrUpdate")
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteTask(id){
            axios({
                method: "DELETE",
                url: baseUrl + "/tasks/" + id,
                headers: {
                    access_token: token
                },
            })
            .then(respon => {
                this.fetchData();
                // this.taskData = "";

                console.log("Deleted")
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created(){
        this.fetchData();
    },
})