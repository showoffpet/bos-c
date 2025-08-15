import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://assignment-9a3e-grktjfrwa-shawns-projects-f6f61110.vercel.app/api', // Updated to match server port
});

export default instance;