import axios from "axios";
import { getToken } from "../utils/token";

const api = axios.create({

    baseURL: "http://localhost:8081"

});

api.interceptors.request.use(

    (config) => {

        const token = getToken();

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    }

);

api.interceptors.response.use(

    (response) => {

        return response;

    },

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");

            window.location.href = "/";

        }

        return Promise.reject(error);

    }

);

export default api;