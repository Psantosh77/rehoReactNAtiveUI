import axios from 'axios';

const instance = axios.create({
 // baseURL: 'https://backendwithnode-hxvv.onrender.com/', // Specify your base URL here
  baseURL : 'htpp://localhost:9000/',
 headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default instance;
