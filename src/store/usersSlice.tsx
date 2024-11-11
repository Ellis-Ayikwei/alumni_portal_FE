import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../helper/axiosInstance';

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
export const GetUsersData = createAsyncThunk('users/getusers', async () => {
    console.log("Getting USers ..... ")
    const response = await axiosInstance.get('/users');
    console.log('response......data......', response.data);
    return response.data;
});

// Create a slice for Login functionality
const usersSlice = createSlice({
    name: 'usersdata',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetUsersData.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetUsersData.fulfilled, (state, action) => {
                state.usersData = action.payload;
                state.loading = false;
            })
            .addCase(GetUsersData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            });
    },
});

// Export the reducer to be used in the store
export default usersSlice.reducer;
