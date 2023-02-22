import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";


export const addToCart = createAsyncThunk('cart/addToCart', async(args) => {
    const {id, qty} = args;
    const {data}= await axios.get(`/api/products/${id}`);

    return {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: qty,
    }
})

export const placeOrder = createAsyncThunk('cart/placeOrder', async(args) => {
    const {cartItems, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice, token} = args;
    const {data} = await axios.post('/api/orders', 
        {
            orderItems: cartItems,
            shippingAddress: shipping,
            paymentMethod: payment.paymentMethod,
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice,
        },
        {
            headers: {
                authorization: `Bearer ${token}`
            },
        }
    )
    return data;
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        loading: false,
        cartItems: [],
        error: null,
        shipping: {},
        payment: {},
        order: {},
        orders: []
    },
    reducers: {
        removeFromCart: (state, action) => {
            const removeItem = current(state).cartItems.filter(x => x.product !== action.payload);
            state.cartItems = removeItem;
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        addQuantity: (state, action) => {
            const item = current(state).cartItems.findIndex(x => x.product === action.payload);
            if (current(state).cartItems[item].qty < current(state).cartItems[item].countInStock){
                state.cartItems[item].qty++;
            }  
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        substractQuantity: (state, action) => {
            const item = current(state).cartItems.findIndex(x => x.product === action.payload);
            state.cartItems[item].qty--;
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        },
        setCartFromCookie: (state, action) => {
            state.cartItems = action.payload
        },
        saveShipping: (state, action) => {
            state.shipping = action.payload;
        },
        savePayment: (state, action) => {
            state.payment = action.payload
        },
    },
    extraReducers: builder => {
        // ADD TO CART
        builder.addCase(addToCart.pending, state => {
            state.loading = true;
        })
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            const item = action.payload;
            const itemInCartIndex = current(state).cartItems.findIndex(x => x.product === item.product);
            if(itemInCartIndex !== -1) {
                state.cartItems[itemInCartIndex].qty += item.qty;
            } else {
                state.cartItems.push(item);
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
        })
        builder.addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }) 
        // PLACE ORDER
        builder.addCase(placeOrder.pending, state => {
            state.loading = true;
        })
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.order = action.payload;
            localStorage.removeItem('cart');
        })
        builder.addCase(placeOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }) 
    }
})

export default cartSlice.reducer;
export const {
    removeFromCart, addQuantity, 
    substractQuantity, setCartFromCookie,
    saveShipping, savePayment,
} = cartSlice.actions;