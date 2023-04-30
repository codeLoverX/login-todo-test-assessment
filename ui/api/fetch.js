import axios from "axios";
import { getCookie } from 'cookies-next';

export const axiosFetch = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
    },
});


axiosFetch.interceptors.request.use(
    async config => {
        const value = getCookie(process.env.COOKIE_NAME)
        // const value = await redisClient.get(rediskey)
        // const keys = JSON.parse(value)
        // config.headers = { 
        //   'Authorization': `Bearer ${keys.access_token}`,
        // }
        config.headers = {
            'Authorization': value,
        }
        // console.log({ header: config.headers })
        return config;
    },
    error => {
        Promise.reject(error)
    });


axios.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        if (error.response.status === 403 && !originalRequest._retry) {
           deleteCookie(process.env.COOKIE_NAME );

            originalRequest._retry = true;
            const access_token = await refreshAccessToken();
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
            return axiosFetch(originalRequest);
        }
        return Promise.reject(error);
    }
);
