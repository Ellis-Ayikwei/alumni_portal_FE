import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAxiosInstance from '../helper/authAxiosInstance';

// Define the initial state type
interface LoginState {
    usersData: object;
    loading: boolean;
    error: string | null;
}

// Define the initial state
const initialState: LoginState = {
    usersData: {},
    loading: false,
    error: null,
};

// Create an async thunk for Login functionality
export const GetUserData = createAsyncThunk('users/getusers', async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
});

// Create a slice for Login functionality
const usersSlice = createSlice({
    name: 'usersdata',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetUserData.pending, (state, action.payload) => {
                state.loading = true;
            })
            .addCase(GetUserData.fulfilled, (state) => {
                state.userData = action.payload
                state.loading = false;
            })
            .addCase(GetUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            });
    },
});


// Export the reducer to be used in the store
export default usersSlice.reducer;