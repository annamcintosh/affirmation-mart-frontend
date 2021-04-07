import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { GetOrder, UpdateOrder, PlaceOrder } from './orderAPI';
import axios from "axios";

const BASE_URL = "https://fgu03ut8lg.execute-api.us-east-1.amazonaws.com/dev";

const initialState = {
  order: {},
  status: "idle",
};

// export const getOrderAsync = createAsyncThunk("order/GetOrder", async () => {
//   const response = await axios.get(
//     `${BASE_URL}/order/6fce5ef8-4d25-45c4-9332-1408b7f75d17`
//   );
//   console.log(response.data.products);
//   return response.data;
// });

// export const addProductToOrderAsync = createAsyncThunk(
//   "order/AddProductToOrder",
//   async (id, productId) => {
//     const response = await axios.get(`${BASE_URL}/order/add/${id}`, {
//       productId,
//     });
//     return response.data;
//   }
// );

// export const removeProductFromOrderAsync = createAsyncThunk(
//   "order/RemoveProductFromOrder",
//   async (id, productId) => {
//     const response = await axios.get(`${BASE_URL}/order/${id}`, productId);
//     return response.data;
//   }
// );

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
  reducers: {
    // getOrder: (state) => {
    //   state.order
    // },
    addProductToOrder: (state, action) => {
      state.order += action.payload;
    },
    removeProductFromOrder: (state, action) => {
      state.order = state.order.filter(
        (product) => product.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(getOrderAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(getOrderAsync.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   state.order = action.payload;
      // })
      // .addCase(addProductToOrderAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(addProductToOrderAsync.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   state.order = action.payload;
      // })
      // .addCase(removeProductFromOrderAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(removeProductFromOrderAsync.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   state.order = action.payload;
      // })
      .addCase(placeOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order = action.payload;
      });
  },
});

export const { getOrder, addProductToOrder, removeProductFromOrder } = orderSlice.actions;

export default orderSlice.reducer;
