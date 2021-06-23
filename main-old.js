var app = new Vue({
    el: '#app',
    props: ['value', 'editing'],
    data: {
        title: 'Testing Vue',
        tasks: [],
        formNew: 0,
        newName: "",
        newDate: "",
        newCat: "backlog",
        targetTask: {
            id: 0,
            name: '',
            deadline: '',
        },
        SERVER: "http://localhost:3000",
    },
    methods: {
        startDrag(task, event){
            this.targetTask = task
        },
        fetchData(){
            axios.get(`${this.SERVER}/tasks`, {headers: {access_token: localStorage.access_token}})
            .then(res => {
                res.data.forEach(el => {
                    if (el.deadline){el.deadline = el.deadline.slice(0,10)}
                })
                this.tasks = res.data
            })
            .catch(err => {
                console.error(err); 
            })
        },
        putName(task, event){
            if (!event.srcElement.textContent) {event.srcElement.textContent = task.name}
            else {
                task.name = event.srcElement.textContent
                axios.put(
                    `${this.SERVER}/tasks/${task.id}`, 
                    task, 
                    {headers: {access_token: localStorage.access_token}}
                )
                .then(res => {
                    this.fetchData()
                })
                .catch(err => {
                    console.error(err); 
                })
            }
        },
        putDate(task, event){
            axios.put(
                `${this.SERVER}/tasks/${task.id}`, 
                task, 
                {headers: {access_token: localStorage.access_token}}
            )
            .then(res => {
                this.fetchData()
            })
            .catch(err => {
                console.error(err); 
            })
        },
        putCat(cat){
            this.targetTask.category = cat
            axios.put(
                `${this.SERVER}/tasks/${this.targetTask.id}`, 
                this.targetTask, 
                {headers: {access_token: localStorage.access_token}}
            )
            .then(res => {
                this.fetchData()
            })
            .catch(err => {
                console.error(err); 
            })
        },
        postTask(){
            this.targetTask = {
                name: this.newName,
                deadline: this.newDate,
                category: this.newCat
            }
            axios.post(
                `${this.SERVER}/tasks`, 
                this.targetTask, 
                {headers: {access_token: localStorage.access_token}}
            )
            .then(res => {
                this.formNew = 0
                this.newName = ""
                this.newDate = ""
                this.newCat = "backlog"
                this.fetchData()
            })
            .catch(err => {
                console.error(err); 
            })
        },
        delTask(id){
            console.log(id)
            axios.delete(`${this.SERVER}/tasks/${id}`, {headers: {access_token: localStorage.access_token}})
            .then(res => {
                this.fetchData()
            })
            .catch(err => {
                console.error(err); 
            })
        }
    },
    computed: {        
        backlog() {
            return this.tasks.filter(task => task.category == 'backlog')
        },
        todo() {
            return this.tasks.filter(task => task.category == 'todo')
        },
        doing() {
            return this.tasks.filter(task => task.category == 'doing')
        },
        done() {
            return this.tasks.filter(task => task.category == 'done')
        },
        deadline(deadline){
            return deadline.toISOString().slice(0,10)
        }
    },
    beforeMount() {
        this.fetchData()
    }

})
  