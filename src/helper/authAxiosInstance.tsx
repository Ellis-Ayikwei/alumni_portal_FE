import axios from 'axios';
// const apiUrl = 'https://127.0.0.1/sc/api/v1';
const apiUrl = 'http://127.0.0.1:5004/alumni/api/v1/auth';

const authAxiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('acccesToken')}`,
        'X-Refresh-Token': `${localStorage.getItem('refreshToken')}`,
    },
});
export default authAxiosInstance;
