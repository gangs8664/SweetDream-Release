import axios from 'axios';

const api = axios.create({
  baseURL: '/accounts',  // 백엔드 API 경로
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
