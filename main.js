var app = new Vue({
    el: '#app',
    props: ['value', 'editing'],
    data: {
        title: 'Testing Vue',
        tasks: [],
        formNew: 0,
        newName: "",
        newDate: "",
        newCat: "",
        targetTask: {
            id: 0,
            name: '',
            deadline: '',
        },
        SERVER: "http://localhost:3000",
    },
    methods: {
        update(task, event){
            console.log(event.srcElement.text)
        },
        startDrag(task, event){
            console.log(task.name)
            this.targetTask = task
            console.log(this.targetTask.id)
        },
        fetchData(){
            axios.get(`${this.SERVER}/tasks`, {headers: {access_token: localStorage.access_token}})
                .then(res => {
                    console.log(res.data)
                    res.data.forEach(el => {
                        if (el.deadline){el.deadline = el.deadline.slice(0,10)}
                        console.log(el.deadline)
                    })
                    this.tasks = res.data
                })
                .catch(err => {
                    console.error(err); 
                })
        },
        putDate(task, event){
            axios.put(
                `${this.SERVER}/tasks/${task.id}`, 
                task, 
                {headers: {access_token: localStorage.access_token}}
            )
            .then(res => {
                console.log(res)
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
  