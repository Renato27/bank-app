import axios from 'axios';
import { isTokenExpired } from '../helpers/helpers';
import { refreshToken } from '../api/auth';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

let isRefreshing = false;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    if(isTokenExpired()){
        localStorage.removeItem('token');
        localStorage.removeItem('expiresAt');
        window.location.href = '/login';
    }else{
        config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            try {
              axiosInstance(originalRequest).then(resolve).catch(reject);
            } catch (error) {
              reject(error);
            }
          });
        }
  
        originalRequest._retry = true;
        isRefreshing = true;
  
        const newToken = await refreshToken();
        isRefreshing = false;
  
        if (newToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } else {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;

