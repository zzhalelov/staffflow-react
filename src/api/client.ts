import axios from 'axios';

// На проде используем относительный путь '/api' (Nginx перенаправит на бэкенд),
// на локалке — http://localhost:8081
const API_BASE_URL = import.meta.env.PROD
    ? ''
    : 'http://localhost:8081';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('staffflow_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('staffflow_token');
            window.location.reload();
        }
        return Promise.reject(error);
    }
);