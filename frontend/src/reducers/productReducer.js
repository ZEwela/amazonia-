import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('productList/fetchProducts', async () => {
    const response =  await axios.get("/api/products")
    const {data} = response;
    return data;
})

export const fetchProductById = createAsyncThunk('productList/fetchProductById', async (productId) => {
    const response =  await axios.get("/api/products/" + productId)
    const {data} = response;
    return data;
})

export const createProduct = createAsyncThunk('productList/createProduct', async (args) => {
    const token = args.token;
    const product = args.product;
    if (product.id) {
        const {data} = await axios.put("/api/products/" + product.id , product, {
            headers: {
                'Authorization': 'Bearer ' + token 
            }
        });
        return data;
    } else {
        const {data} = await axios.post("/api/products", product, {
            headers: {
                'Authorization': 'Bearer ' + token 
            }
        });
        return data;
    }
})

export const deleteProduct = createAsyncThunk('productList/deleteProduct', async (args) => {
    const token = args.token;
    const productId = args.productId;
    const {data} = await axios.delete("/api/products/" + productId, {
        headers: {
            'Authorization': 'Bearer ' + token 
        }
    });
    return data;
})

const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    products: [],
    product: [],
    loading: false,
    error: null, 
    loadingCreate: false,
    errorCreate: null,
    successCreate: false,
    loadingDelete: false,
    errorDelete: null,
    successDelete: false,
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
        state.error = action.error.message;
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
    builder.addCase(createProduct.pending, state => {
        state.loadingCreate = true;
    })
    builder.addCase(createProduct.fulfilled, (state, action) => {
        state.loadingCreate = false;
        state.product = action.payload;
        state.errorCreate = null;
        state.successCreate = true;
    })
    builder.addCase(createProduct.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errorCreate = action.error.message;
        state.successCreate = false;
    })
    builder.addCase(deleteProduct.pending, state => {
        state.loadingDelete = true;
    })
    builder.addCase(deleteProduct.fulfilled, (state) => {
        state.loadingDelete = false;
        state.errorDelete = null;
        state.successDelete = true;
    })
    builder.addCase(deleteProduct.rejected, (state, action) => {
        state.loadingDelete = false;
        state.errorDelete = action.error.message;
        state.successDelete = false;
    })
    }
});


export default productListSlice.reducer; 

