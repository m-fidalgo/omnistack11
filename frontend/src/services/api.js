import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3303'
})

export default api;