import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import productsReducer from '../features/products/productsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    products: productsReducer,
  },
});
