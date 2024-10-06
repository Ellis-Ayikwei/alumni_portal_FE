import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../helper/axiosInstance';

// Define the initial state type
interface LogoutState {
    isLogout: boolean;
    loading: boolean;
    error: string | null;
}

// Define the initial state
const initialState: LogoutState = {
    isLogout: false,
    loading: false,
    error: null,
};

// Create an async thunk for logout functionality
export const logoutUser = createAsyncThunk('logout/logoutUser', async () => {
    const response = await axiosInstance.post('auth/logout');
    return response.data;  // Return the response data if needed
});

// Create a slice for logout functionality
const logOutSlice = createSlice({
    name: 'logout',
    initialState,
    reducers: {
        resetLogout: (state) => {
            state.isLogout = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLogout = true;
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
