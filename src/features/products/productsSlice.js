import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetProduct, GetProducts } from './productsAPI';

const initialState = {
  products: [],
  product: {},
  status: 'idle',
};

export const getProductsAsync = createAsyncThunk(
  'products/GetProducts',
  async (email, password) => {
    const response = await GetProducts(email, password);
    return response.data;
  }
);

export const getProductAsync = createAsyncThunk(
  'products/GetProduct',
  async (id) => {
    const response = await GetProduct(id);
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(getProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.product = action.payload;
      });
  },
});

export default productsSlice.reducer;
