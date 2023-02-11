import {configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/productReducers';
import logger from 'redux-logger';


const store = configureStore({
    reducer: {
      productList: productReducer,
    }
});

export default store;