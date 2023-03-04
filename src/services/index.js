import axios from 'axios';

const api = axios.create({
    baseURL: 'https://megacredsolucoes.com.br/api/'
})

export default api;