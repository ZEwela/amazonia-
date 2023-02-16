import {configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
    reducer: {
      productList: productReducer,
      cart: cartReducer,
      user: userReducer,
    }
});

export default store;