import {configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import userReducer from './reducers/userReducer';
import orderReducer from './reducers/orderReducer';


const store = configureStore({
    reducer: {
      productList: productReducer,
      cart: cartReducer,
      user: userReducer,
      order: orderReducer,
    }
});


export default store;