import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAxiosInstance from '../helper/authAxiosInstance';

// Define the initial state type
interface LoginState {
    isLoggedIn: boolean;
    loading: boolean;
    myData: object;
    role: string;
    error: string | null;
}

// Define the initial state
const initialState: LoginState = {
    isLoggedIn: false,
    loading: false,
    role: '',
    myData: {},
    error: null,
};

// Create an async thunk for Login functionality
export const LoginUser = createAsyncThunk('Login/LoginUser', async ({ userOrEmail, password }: { userOrEmail: { email?: string; username?: string }; password: string }) => {
    const payload = { ...userOrEmail, password };
    const response = await authAxiosInstance.post('/login', payload);
    console.log(response)
    return response.data;
});

// Create a slice for Login functionality
const logInSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        resetLogin: (state) => {
            state.isLoggedIn = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.myData = action.payload;
                state.role = action.payload.role;
                state.isLoggedIn = true;
                state.loading = false;
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            });
    },
});

// Export the action creators
export const { resetLogin } = logInSlice.actions;

// Export the reducer to be used in the store
export default logInSlice.reducer;
