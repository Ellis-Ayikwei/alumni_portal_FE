import axios from 'axios';

const apiUrl = 'http://127.0.0.1:5004/alumni/api/v1';

const axiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;
let refreshSubscribers: RefreshSubscriber[] = [];

type RefreshSubscriber = (accessToken: string) => void;

const onRefreshed = (accessToken: string): void => {
    refreshSubscribers.forEach((callback) => callback(accessToken));
    refreshSubscribers = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    refreshSubscribers.push((token) => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        resolve(axiosInstance(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const response = await axios.post(`${apiUrl}/refresh_token`, null, {
                    withCredentials: true,
                });

                const newAccessToken = response?.data?.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                onRefreshed(newAccessToken);

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed. Redirecting to login...');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        console.error(`Error in ${error.config?.url}:`, error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;

