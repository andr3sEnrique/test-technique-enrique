import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    token: null,
    status: 'idle',
    error: null,
};

export const login = createAsyncThunk('auth/login', async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/auth/login', user);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const register = createAsyncThunk('auth/register', async (user) => {
    const response = await axios.post('http://localhost:5000/auth/register', user);
    return response.data;
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(login.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(login.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.token = action.payload.token;
        })
        .addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload ? action.payload.message : action.error.message;
        })
        .addCase(register.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(register.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.token = action.payload.token;
        })
        .addCase(register.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;