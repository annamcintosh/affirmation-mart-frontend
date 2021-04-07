import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { GetProduct, GetProducts } from "./productsAPI";

const BASE_URL = "https://fgu03ut8lg.execute-api.us-east-1.amazonaws.com/dev";

const initialState = {
  products: [],
  product: {},
  status: "idle",
};

export const getProductsAsync = createAsyncThunk(
  "products/GetProducts",
  async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  }
);

export const getProductAsync = createAsyncThunk(
  "products/GetProduct",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/product/${id}`);
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(getProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.product = action.payload;
      });
  },
});

export default productsSlice.reducer;
