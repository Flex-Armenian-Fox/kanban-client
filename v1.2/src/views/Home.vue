<template>
    <div>
        <Navbar @LoggedOut="$emit('LoggedOut')"></Navbar>
        <section>
            <div class="columns is-flex-direction-column is-align-items-stretch is-justify-content-center">
                <Card></Card>
            </div>
        </section>
    </div>
</template>

<script>
import Card from "../components/Card.vue";
import Navbar from "../components/Navbar.vue";

export default {
    name: "Home",
    components: { Card, Navbar },
    data() {
        return {};
    },
};
</script>

<style>
</style>