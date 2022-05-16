import { useContext } from 'react'
import axios from "axios";
import {TodoContext} from "../store/TodoContext";


axios.defaults.baseURL = 'http://localhost:5000/api/v1/';
//axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

const token = localStorage.getItem('token');
//axios.defaults.headers.common['Authorization'] = `Bearer ${ token }`;
axios.defaults.headers['token'] = token;

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger


    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    if (error.response.status === 401 || error.response.message === "Unauthorized") {
        Logout();

    }

    return Promise.reject(error);
});


export const Logout = () => {
    localStorage.removeItem('token');
}
