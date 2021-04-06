import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/user/userSlice";
import productsReducer from "../features/products/productsSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    user: userReducer,
    order: orderReducer,
    products: productsReducer,
  },
});
