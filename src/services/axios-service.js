import axios from 'axios'
import authServie from './auth-service'
import { DEFALUT_URL } from '../actions/types'
class AxiosService {
    axiosInstance = {};

    constructor() {
        this.initInstance();
    }

    initInstance() {
        this.axiosInstance = axios.create({
            baseURL: `${DEFALUT_URL}/api`,
            timeout: 50000
        });

        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = authServie.getToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                    config.headers['Content-Type'] = 'application/json';
                }
                return config;
            });
        return this.axiosInstance;
    }
    getInstance() {
        return this.axiosInstance || this.initInstance();
    }
}

export default new AxiosService();