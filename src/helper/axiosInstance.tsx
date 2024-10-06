import axios from 'axios';
// const apiUrl = 'https://127.0.0.1/sc/api/v1';
const apiUrl = 'http://127.0.0.1:5004/alumni/api/v1';

const axiosInstance = axios.create({
    baseURL: apiUrl,
	withCredentials: true,
    headers: {
        'Content-Type': 'Application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    },
});
export default axiosInstance;
