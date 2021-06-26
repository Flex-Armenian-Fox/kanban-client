<template>
  <div>
      <CategoryComponent>
          <TaskComponent></TaskComponent>
      </CategoryComponent>
  </div>
</template>

<script>
import CategoryComponent from '../components/Category.vue'
import TaskComponent from '../components/Task.vue'

export default {
    components: {
        CategoryComponent,
        TaskComponent
    }
}
</script>

<style>

</style>