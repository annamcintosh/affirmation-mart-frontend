import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { GetOrder, UpdateOrder, PlaceOrder } from './orderAPI';
import axios from "axios";

const BASE_URL = "https://fgu03ut8lg.execute-api.us-east-1.amazonaws.com/dev";

const initialState = {
  order: {},
  status: "idle",
};

export const getOrderAsync = createAsyncThunk("order/GetOrder", async (id) => {
  const response = await axios.get(`${BASE_URL}/order/user/${id}`);
  return response.data;
});

export const addProductToOrderAsync = createAsyncThunk(
  "order/AddProductToOrder",
  async ({ name, unitPrice, id }) => {
    const response = await axios.patch(
      `${BASE_URL}/order/add/c75820f2-4d41-4e45-b25b-cefedc2b44c7`,
      {
        id,
        name,
        unitPrice,
      }
    );
    return response.data;
  }
);

export const removeProductFromOrderAsync = createAsyncThunk(
  "order/RemoveProductFromOrder",
  async ({ unitPrice, productId }) => {
    const response = await axios.patch(
      `${BASE_URL}/order/remove/c75820f2-4d41-4e45-b25b-cefedc2b44c7`,
      {
        productId,
        unitPrice,
      }
    );
    return response.data;
  }
);

export const placeOrderAsync = createAsyncThunk(
  "order/PlaceOrder",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/order/place/${id}`);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
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
      })
      .addCase(placeOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order = action.payload;
      });
  },
});

export default orderSlice.reducer;
