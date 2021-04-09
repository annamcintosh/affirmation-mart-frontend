import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { GetOrder, UpdateOrder, PlaceOrder } from './orderAPI';
import axios from "axios";

const BASE_URL = "https://fgu03ut8lg.execute-api.us-east-1.amazonaws.com/dev";

const initialState = {
  order: {},
  status: "idle",
};

export const getOrderAsync = createAsyncThunk(
  "order/GetOrder",
  async ({ user }) => {
    const userId = user.id;
    const response = await axios.get(`${BASE_URL}/order/user/${userId}`);
    return response.data;
  }
);

export const addProductToOrderAsync = createAsyncThunk(
  "order/AddProductToOrder",
  async ({ user, name, unitPrice, id }) => {
    const orderId = user.shoppingOrder;
    const response = await axios.patch(`${BASE_URL}/order/add/${orderId}`, {
      id,
      name,
      unitPrice,
    });
    return response.data;
  }
);

export const removeProductFromOrderAsync = createAsyncThunk(
  "order/RemoveProductFromOrder",
  async ({ user, unitPrice, productId }) => {
    const orderId = user.shoppingOrder;
    const response = await axios.patch(`${BASE_URL}/order/remove/${orderId}`, {
      productId,
      unitPrice,
    });
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.status = "idle";
      state.order = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order = action.payload;
      })
      .addCase(addProductToOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductToOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order = action.payload;
      })
      .addCase(removeProductFromOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeProductFromOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order = action.payload;
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
