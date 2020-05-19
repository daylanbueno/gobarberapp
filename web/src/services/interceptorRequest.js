/* eslint-disable no-param-reassign */
import { toast } from 'react-toastify';

import api from './api';

const interceptor = api.interceptors.request.use(async (config) => {
    try {
        const { token } = JSON.parse(localStorage.getItem('token'));
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } catch (e) {
        toast.warn(
            'Ouve um problema com o token, se o problema continuar favor procure o administrador do sistema.'
        );
        return config;
    }
});

export default interceptor;
