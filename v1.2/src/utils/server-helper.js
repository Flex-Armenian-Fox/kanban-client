import axios from "axios"

const instance = axios.create({
    baseURL: 'https://antonp-kanban-server.herokuapp.com/api',
    headers: { 'Content-Type': 'application/json' }
});

export default instance