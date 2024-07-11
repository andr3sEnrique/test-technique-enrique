import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    status: 'idle',
    error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const response = await axios.get('http://localhost:5000/products', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    await axios.delete(`http://localhost:5000/products/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return id;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, updateProduct }, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const response = await axios.put(`http://localhost:5000/products/${id}`, updateProduct, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

export const createProduct = createAsyncThunk('products/createProduct', async (newProduct, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const response = await axios.post('http://localhost:5000/products', newProduct, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter(product => product._id !== action.payload);
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            const index = state.products.findIndex(product => product._id === action.payload._id);
            state.products[index] = action.payload;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.products.push(action.payload);
        });
    },
});

export default productsSlice.reducer;