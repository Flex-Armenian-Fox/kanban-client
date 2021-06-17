var app = new Vue({
    el: '#app',
    props: ['value', 'editing'],
    data: {
        title: 'Testing Vue',
        backlog: [
            {
                id: 1,
                name: 'first test',
                description: '',
                deadline: '17 juni'
            },
            {
                id: 2,
                name: 'second test',
                description: '',
                deadline: '17 juni'
            }
        ],
        todo: [
            {
                id: 1,
                name: 'first todo',
                description: '',
                deadline: '17 juni'
            },
            {
                id: 2,
                name: 'second todo',
                description: '',
                deadline: '17 juni'
            } 
        ],
        doing: [
            {
                id: 1,
                name: 'first doing',
                description: '',
                deadline: '17 juni'
            },
            {
                id: 2,
                name: 'second doing',
                description: '',
                deadline: '17 juni'
            }
        ],
        done: [
            {
                id: 1,
                name: 'first done',
                description: '',
                deadline: '17 juni'
            },
            {
                id: 2,
                name: 'second done',
                description: '',
                deadline: '17 juni'
            }
        ],
        formNew: 0,
        newName: "",
        newDesc: "",
        newDate: "",
        newCat: "",
    },
    methods: {
        update(task){
            console.log(task)
        }
    }
})
  