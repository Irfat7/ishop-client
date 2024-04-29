import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/'
})

export const useAxiosSecure = () => {
    axiosInstance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(function (response) {
        console.log('success with token', response);
        return response;
    }, function (error) {
        if (error.response.status === 401 || error.response.status === 403) {
            console.log('token problem logging out', error)
        }
        return Promise.reject(error);
    });

    return axiosInstance
}