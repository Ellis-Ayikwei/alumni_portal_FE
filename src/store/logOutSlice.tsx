import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAxiosInstance from '../helper/authAxiosInstance';
import getCookie from '../helper/getCookies';

// Define the initial state type
interface LogoutState {
    isLoggedOut: boolean;
    loading: boolean;
    error: string | null;
}

// Define the initial state
const initialState: LogoutState = {
    isLoggedOut: false,
    loading: false,
    error: null,
};

// Create an async thunk for logout functionality
export const logoutUser = createAsyncThunk('logout/logoutUser', async () => {
    console.log('the csrf token is', getCookie('csrf_access_token'));
    const response = await authAxiosInstance.post('/logout', {
        headers: {
            'X-CSRF-TOKEN': getCookie('csrf_access_token'),
        },
    });
    return response.data;
});

// Create a slice for logout functionality
const logOutSlice = createSlice({
    name: 'logout',
    initialState,
    reducers: {
        resetLogout: (state) => {
            state.isLoggedOut = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoggedOut = true;
                state.loading = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            });
    },
});

// Export the action creators
export const { resetLogout } = logOutSlice.actions;

// Export the reducer to be used in the store
export default logOutSlice.reducer;
