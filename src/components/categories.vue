<template>
  <div class="col-12 col-xl-3 my-1 justify-content-center"  @drop='putCat("backlog")' @dragenter.prevent @dragover.prevent>
        <div class="d-flex w-75 flex-column rounded-lg bg-dark pb-4 mx-auto">
            <div class="text-3xl text-bold text-white uppercase ml-4 my-2">BACKLOG</div>
            <!-- Start backlog loop-->
            <card v-for=></card>
        </div>
    </div>
</template>

<script>
import card from './cards.vue'
export default {
    props: {name, data}
}
</script>

<style>

</style>