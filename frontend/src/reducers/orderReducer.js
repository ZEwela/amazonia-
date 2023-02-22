import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrder = createAsyncThunk('order/getOrder', async(args) => {
    const {orderId} = args;
    const token = JSON.parse(localStorage.getItem('user'))[0].token;
    const {data} = await axios.get(`/api/orders/${orderId}`,
        {
            headers: {
                authorization: `Bearer ${token}`
            },
        }
    )
    return data;
})

export const loadPaypalScript = createAsyncThunk('order/loadPaypalScript', async() => {
    const token = JSON.parse(localStorage.getItem('user'))[0].token;
    const {data: clientId} = await axios.get('/api/keys/paypal', 
        {
            headers: {
                authorization: `Bearer ${token}`
            },
        }  
    )
    return clientId;
})

export const onApprovePayPal = createAsyncThunk('order/onApprovePayPal', async(args) => {
    const {orderId, details} = args;
    const token = JSON.parse(localStorage.getItem('user'))[0].token;
    const {data} = await axios.put(`/api/orders/${orderId}/pay`, 
        details,
        {
            headers: {
                authorization: `Bearer ${token}`
            },
        }  
    )
    console.log(data);
    return data;
})

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: true,
        error: null,
        orderInfo: {},
        orders: [],
        payPalClientId: null,
    },
    reducers: {},
    extraReducers: builder => {
        // GET ORDER
        builder.addCase(getOrder.pending, state => {
            state.loading = true;
        })
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.orderInfo = action.payload;
        })
        builder.addCase(getOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }) 
        // LOAD PAYPAL SCRIPT
        builder.addCase(loadPaypalScript.pending, state => {
            state.loading = true;
        })
        builder.addCase(loadPaypalScript.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.payPalClientId = action.payload;
        })
        builder.addCase(loadPaypalScript.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }) 
        // UPDATE ORDER AFTER SUCESSFUL PAYPAL PAYMENT
        builder.addCase(onApprovePayPal.pending, state => {
            state.loading = true;
        })
        builder.addCase(onApprovePayPal.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.orderInfo = action.payload;
        })
        builder.addCase(onApprovePayPal.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }) 
    }
})

export default orderSlice.reducer;
export const {} = orderSlice.actions;