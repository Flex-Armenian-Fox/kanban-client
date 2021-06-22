<template>
    <div class="column is-full">
        <div class="mb-4">
            <h2 class="is-size-3 has-text-weight-light has-text-white">
                <center>Kanban Board</center>
            </h2>
        </div>

        <div class="columns">
            <div class="column is-3" v-for="category in categories" :key="category.id">
                <header 
                    v-bind:class="{
                        'card-header has-background-warning': category.name == 'Backlog',
                        'card-header has-background-info-dark': category.name == 'Todo',
                        'card-header has-background-success': category.name == 'Doing',
                        'card-header has-background-danger': category.name == 'Done',
                    }"
                >
                    <p class="card-header-title">
                        <span class="icon">
                            <i class="fas fa-thumbtack"></i>
                        </span>
                        <span>{{category.name.toUpperCase()}}</span>
                    </p>
                </header>
                <!-- <div v-for="item in allTasks.backlogs" :key="item.id" class="card mb-3"> -->
                <div class="card mb-3">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                    <!-- <img v-bind:src="item.User.img_url" /> -->
                                    <!-- <img v-bind:src="item.User.img_url" /> -->
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">
                                    <!-- {{ item.User.full_name }} -->
                                </p>
                                <p class="subtitle is-6">
                                    <!-- {{ item.User.email }} -->
                                </p>
                            </div>
                        </div>
                        <div class="content">
                            <p class="title is-size-5 is-capitalized">
                                <!-- {{ item.title }} -->
                            </p>
                            <!-- <p class="is-size-6">{{ item.task_detail }}</p> -->
                        </div>
                    </div>
                    <footer class="card-footer">
                        <div class="card-footer-item field is-grouped">
                            <p class="control">
                                <!-- <a @click="showEdit(item)" class="button is-link">Edit</a> -->
                                <a>Edit</a>
                            </p>
                            <p class="control">
                                <!-- <a @click="deleteData(item.id, item.title)" class="button is-danger">Delete</a> -->
                                <a>Delete</a>
                            </p>
                            <!-- 
                                <p class="control">
                                    <div class="select is-link">
                                        <select @change="changeCategory(item.id, item.category)" v-model="item.category">
                                            <option></option>
                                        </select>
                                    </div>
                                </p> 
                            -->
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Card",
    data() {
        return {
            categories: [
                { id: 1, name: "Backlog" },
                { id: 2, name: "Todo" },
                { id: 3, name: "Doing" },
                { id: 4, name: "Done" },
            ],
        };
    },
};
</script>

<style>
</style>