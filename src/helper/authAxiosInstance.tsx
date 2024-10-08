import axios from 'axios';
import getCookie from './getCookies';
// const apiUrl = 'https://127.0.0.1/sc/api/v1';
const apiUrl = 'http://127.0.0.1:5004/alumni/api/v1/auth';
const csrfToken = getCookie('csrf_access_token');
console.log('CSRF Token:', csrfToken);

const authAxiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
});
export default authAxiosInstance;
