<template>
    <div class="column is-3">  
        <header 
            v-bind:class="{
                'card-header has-background-warning': category.name == 'backlog',
                'card-header has-background-info-dark': category.name == 'todo',
                'card-header has-background-success': category.name == 'doing',
                'card-header has-background-danger': category.name == 'done',
            }"
        >
            <p class="card-header-title">
                <span class="icon">
                    <i class="fas fa-thumbtack"></i>
                </span>
                <span>{{category.name.toUpperCase()}}</span>
            </p>
        </header>

        <div v-for="item in taskByCategory[category.name]" :key="item.id" class="card mb-3">        
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img v-bind:src="item.User.img_url" />                            
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4">
                            {{ item.User.full_name }}
                        </p>
                        <p class="subtitle is-6">
                            {{ item.User.email }}
                        </p>
                    </div>
                </div>
                <div class="content">
                    <p class="title is-size-5 is-capitalized">
                        {{ item.title }}
                    </p>
                    <p class="is-size-6">{{ item.task_detail }}</p>
                </div>
            </div>
            <footer class="card-footer">
                <div class="card-footer-item field is-grouped">
                    <p class="control">
                        <!-- <a @click="showEdit(item)" class="button is-link">Edit</a> -->
                        <a class="button is-link">Edit</a>
                    </p>
                    <p class="control">
                        <!-- <a @click="deleteData(item.id, item.title)" class="button is-danger">Delete</a> -->
                        <a class="button is-danger">Delete</a>
                    </p>

                    <div class="control">
                        <div class="select is-link">
                            <select v-model="item.category">
                                <option v-for="value in categories" :key="value.id">{{value.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: "TaskCard",
    props: ["taskByCategory", "category", "categories"],
    data() {
        return {
            
        }
    }
};
</script>

<style>
</style>