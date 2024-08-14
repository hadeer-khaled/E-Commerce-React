import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

const axios_instance = axios.create({baseURL: BASE_URL})

axios_instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }
  );

export default axios_instance ;