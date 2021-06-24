<template>
  <div class="col-12 col-xl-3 my-1 justify-content-center"  @drop='putCat' @dragenter.prevent @dragover.prevent>
        <div class="d-flex w-75 flex-column rounded-lg bg-dark pb-4 mx-auto">
            <div class="text-3xl text-bold text-white uppercase ml-4 my-2">{{category}}</div>
            <!-- Start backlog loop-->
            <Card v-for="task in taskList" :key="task.id" :task="task" @fetchData="fetchData" @dragTask="getTarget"></Card>
        </div>
    </div>
</template>

<script>
import Card from './Card.vue'
export default {
    components: {
        Card
    }, 
    data(){
        return {
            target: {}
        }
    },
    props: ["taskList", "category"],
    methods: {
        fetchData(){
            this.$emit('fetchData')
        },
        getTarget(task){
            this.target = task
            this.$emit('getTarget', this.target)
        },
        putCat(){
            this.$emit('putCat')
        },

    }
}
</script>

<style>

</style>