<template>
    <div>
        <section>
            <nav
                class="navbar is-dark"
                role="navigation"
                aria-label="main navigation"
            >
                <div class="navbar-brand">
                    <a
                        role="button"
                        class="navbar-burger"
                        aria-label="menu"
                        aria-expanded="true"
                        data-target="navbarBasicExample"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                        <!-- <a @click="fetchData()" class="navbar-item">Home</a> -->
                        <a class="navbar-item">Home</a>
                        <a
                            href="https://github.com/antonprio/kanban-server/blob/master/API%20Doc.md"
                            target="_blank"
                            class="navbar-item"
                            >API Documentation</a
                        >

                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">More</a>
                            <div class="navbar-dropdown">
                                <!-- <a @click="isData = false" class="navbar-item">Add Task</a> -->
                                <a class="navbar-item">Add Task</a>
                                <a class="navbar-item">My Task</a>
                            </div>
                        </div>
                    </div>

                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <!-- <a @click="logout" class="button is-danger">Log Out</a> -->
                                <a @click="logout()" class="button is-danger">Log Out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </section>
    </div>
</template>

<script>
export default {
    name: "Navbar",
    data() {
        return {

        }
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$emit('LoggedOut')
        }
    }
};
</script>

<style>
</style>