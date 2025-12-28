import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import type {
    DtoUserLoginRequest,
    DtoUserRegisterRequest,
    DtoUserUpdateRequest,
    DtoUserResponse
} from '../api/Api';

interface AuthState {
    user: DtoUserResponse | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (data: DtoUserLoginRequest, { rejectWithValue }) => {
        try {
            const response = await api.api.usersLoginCreate(data);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка авторизации');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (data: DtoUserRegisterRequest, { rejectWithValue }) => {
        try {
            const response = await api.api.usersRegisterCreate(data);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка регистрации');
        }
    }
);

export const getProfile = createAsyncThunk(
    'auth/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.api.usersProfileList();
            return response.data;
        } catch (err: any) {
            return rejectWithValue('Не удалось загрузить профиль');
        }
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (data: DtoUserUpdateRequest, { rejectWithValue }) => {
        try {
            const response = await api.api.usersProfileUpdate(data);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка обновления');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { }) => {
        try {
            await api.api.usersLogoutCreate();
        } catch (e) {
            console.warn(e);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => { state.error = null; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.access_token || null;
                state.isAuthenticated = true;
                if (state.token) localStorage.setItem('token', state.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                localStorage.removeItem('token');
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;