import axios from 'axios';
import getCookie from './getCookies';
// const apiUrl = 'https://127.0.0.1/sc/api/v1';
const apiUrl = 'http://192.168.100.52:5004/alumni/api/v1';

const axiosInstance = axios.create({
    baseURL: apiUrl,
	withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    },
});
export default axiosInstance;

