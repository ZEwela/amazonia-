import {configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducers';
import cartReducer from './reducers/cartReducer';


const store = configureStore({
    reducer: {
      productList: productReducer,
      cart: cartReducer,
    }
});

export default store;