import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('productList/fetchProducts', () => {
    return axios.get("/api/products")
    .then((response) => response.data)
})

export const fetchProductById = createAsyncThunk('productList/fetchProductById', (productId) => {
    return axios.get("/api/products/" + productId)
    .then((response) => response.data)
})

const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    loading: false,
    products: [],
    product: [],
    error: null, 
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
        state.loading = true;
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    builder.addCase(fetchProductById.pending, state => {
        state.loading = true;
    })
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
    })
    builder.addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    }
});


export default productListSlice.reducer; 

