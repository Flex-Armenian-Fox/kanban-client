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
                        <a @click="$emit('clickAction', 'home')" class="navbar-item">Home</a>
                        <a
                            href="https://github.com/antonprio/kanban-server/blob/master/API%20Doc.md"
                            target="_blank"
                            class="navbar-item"
                            >API Documentation</a
                        >

                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">More</a>
                            <div class="navbar-dropdown">
                                <a @click="$emit('clickAction', 'addTask')" class="navbar-item">Add Task</a>
                            </div>
                        </div>
                    </div>

                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <GoogleLogin 
                                    :params="params" 
                                    :onSuccess="logout" 
                                    :logoutButton="true" 
                                    class="button is-danger"
                                >Log Out</GoogleLogin>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </section>
    </div>
</template>

<script>
import GoogleLogin from "vue-google-login"

export default {
    name: "Navbar",
    components: { GoogleLogin },
    data() {
        return {
            page: "home",
            params: {
                client_id: '265426479351-kdh0fa6ll05bssj1t6kvaa3of7qhrg8q.apps.googleusercontent.com'
            }
        }
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$emit('LoggedOut')
        },
    },
};
</script>

<style>
</style>