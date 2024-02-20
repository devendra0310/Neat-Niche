import {configureStore} from '@reduxjs/toolkit';
import productSlice from './slices/productSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
    reducer:{
        product:productSlice,
        user:userSlice,
    },
})

export default store