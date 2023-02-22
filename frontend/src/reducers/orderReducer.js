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

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: true,
        error: null,
        orderInfo: {},
        orders: []
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
    }
})

export default orderSlice.reducer;
export const {} = orderSlice.actions;