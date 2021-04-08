import axios from 'axios';

const api = axios.create({
    //baseURL: 'https://api-mita.herokuapp.com/'
    baseURL: 'http://192.168.0.103:8080'
})

export default api;