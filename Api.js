import axios from "axios";

const ApiManager = axios.create({
  baseURL: "http://localhost:8080",
  responseType: "json",
  withCredentials: false,
});

ApiManager.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('site');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiManager;