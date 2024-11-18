import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authAxiosInstance from '../helper/authAxiosInstance';
import axiosInstance from '../helper/axiosInstance';
import { persistor } from './index';

interface AuthState {
    isLoggedIn: boolean;
    loading: boolean;
    user: any | null;
    error: string | null;
    message: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    loading: false,
    user: null,
    error: null,
    message: null,
};

const ERROR_MESSAGES = {
    DEFAULT: 'An error occurred',
    LOGIN_FAILED: 'Invalid username or password',
    REGISTER_FAILED: 'Registration failed. Please try again.',
    RESET_PASSWORD_FAILED: 'Failed to reset the password. Please try again.',
    FORGOT_PASSWORD_FAILED: 'Failed to request password reset. Please try again.',
};

const TOKEN_KEY = 'auth_token'; // Update this key to match your app's needs

// Async Thunks
export const LoginUser = createAsyncThunk('auth/LoginUser', async ({ userOrEmail, password }: { userOrEmail: { email?: string; username?: string }; password: string }) => {
    const payload = { ...userOrEmail, password };
    try {
        const response = await authAxiosInstance.post('/login', payload);
        const accessToken = response?.headers['authorization'];
        const refreshToken = response?.headers['x-refresh-token'];
        localStorage.setItem('acccesToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || ERROR_MESSAGES.LOGIN_FAILED);
    }
});


export const LogoutUser = createAsyncThunk(
    'auth/LogoutUser',
    async (_, { dispatch }) => {
      try {
        const response = await authAxiosInstance.post('/logout');
  

        if(response.status === 204){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
  
        await persistor.purge();
        
        dispatch(resetAuth());
        await localStorage.clear();
        }
      } catch (error: any) {
        console.error('Logout error:', error);
        throw new Error(error.response?.data?.message || ERROR_MESSAGES.DEFAULT);
      }
    }
  );

export const RegisterUser = createAsyncThunk(
    'auth/RegisterUser',
    async ({ userOrEmail, password, confirm_password }: { userOrEmail: { email?: string; username?: string }; password: string; confirm_password: string }) => {
        const payload = { ...userOrEmail, password, confirm_password };
        try {
            const response = await axiosInstance.post('/register', payload);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || ERROR_MESSAGES.REGISTER_FAILED);
        }
    }
);

export const ForgetPassword = createAsyncThunk('auth/ForgetPassword', async ({ email }: { email: string }) => {
    try {
        const response = await axiosInstance.post('/forget_password', { email });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || ERROR_MESSAGES.FORGOT_PASSWORD_FAILED);
    }
});

export const ResetPassword = createAsyncThunk('auth/ResetPassword', async ({ newPassword, confirmNewPassword, token }: { newPassword: string; confirmNewPassword: string; token: string }) => {
    try {
        const response = await axiosInstance.post('/reset_password', { newPassword, confirmNewPassword, token });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || ERROR_MESSAGES.RESET_PASSWORD_FAILED);
    }
});

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.error = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                console.log('the state user', state.user);
                state.isLoggedIn = true;
                localStorage.setItem("userRole", state.user.role)
                state.loading = false;
                state.message = 'Login successful';
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || ERROR_MESSAGES.LOGIN_FAILED;
                state.message = null;
            })
            .addCase(LogoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(LogoutUser.fulfilled, (state) => {
                state.user = null;
                state.isLoggedIn = false;
                state.loading = false;
                state.message = 'Logged out successfully';
            })
            .addCase(LogoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || ERROR_MESSAGES.DEFAULT;
            })
            .addCase(RegisterUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(RegisterUser.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(RegisterUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || ERROR_MESSAGES.REGISTER_FAILED;
                state.message = null;
            })
            .addCase(ForgetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(ForgetPassword.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(ForgetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || ERROR_MESSAGES.FORGOT_PASSWORD_FAILED;
                state.message = null;
            })
            .addCase(ResetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(ResetPassword.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.loading = false;
            })
            .addCase(ResetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || ERROR_MESSAGES.RESET_PASSWORD_FAILED;
                state.message = null;
            });
    },
});

// Export the action creators
export const { resetAuth } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
