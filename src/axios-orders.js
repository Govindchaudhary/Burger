import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-d90ae.firebaseio.com/'
});

export default instance;