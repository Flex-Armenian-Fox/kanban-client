import axios from 'axios'
const instance = axios.create({
    // baseURL: " https://calm-ocean-40393.herokuapp.com",
    baseURL: " http://localhost:3000",
    headers: {'content-type': 'application/json'}
  });

export default instance