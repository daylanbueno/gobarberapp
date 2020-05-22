/* eslint-disable no-param-reassign */
import api from './api';

const interceptor = api.interceptors.request.use(async (config) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('token'));
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } catch (e) {
        return config;
    }
});

export default interceptor;
