import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5500/api', // Updated to match server port
});

export default instance;