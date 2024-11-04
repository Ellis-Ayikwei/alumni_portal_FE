import axiosInstance from './axiosInstance';

/**
 * Asynchronous function that makes a GET request to the server using axiosInstance
 * and returns the response data.
 *
 * @param {string} url - The URL to make the request to.
 * @param {object} [config] - Optional axios request config.
 * @returns {Promise} - A promise that resolves to the response data.
 */
const fetcher = async (url: string, config: object = {}): Promise<any> => {
    try {
        if (!url) {
            throw new Error('No URL provided');
        }
        const response = await axiosInstance.get(url, config);
        console.log(`Fetched data from swr for URL ${url}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for URL ${url}:`, error);
        throw error;
    }
};

export default fetcher;
