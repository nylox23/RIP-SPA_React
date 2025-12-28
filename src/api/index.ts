import { Api } from './Api';

export const api = new Api({
    baseURL: '/',
});

api.instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});