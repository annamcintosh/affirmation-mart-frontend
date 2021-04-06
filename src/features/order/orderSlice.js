import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetOrder, UpdateOrder, ProcessOrder } from './orderAPI';

const initialState = {
  order: [],
  status: 'idle',
};

export const getOrderAsync = createAsyncThunk(
  'order/GetOrder',
  async (email, password) => {
    const response = await GetOrder(email, password);
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  'order/UpdateOrder',
  async (id) => {
    const response = await UpdateOrder(id);
    return response.data;
  }
);

export const processOrderAsync = createAsyncThunk(
  'order/ProcessOrder',
  async (id) => {
    const response = await ProcessOrder(id);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order = action.payload;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order = action.payload;
      })
      .addCase(processOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(processOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order = action.payload;
      });
  },
});

export default orderSlice.reducer;
