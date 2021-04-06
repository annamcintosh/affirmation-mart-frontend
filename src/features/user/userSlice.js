import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { GetUser, CreateUser } from './userAPI';
import axios from "axios";

const BASE_URL = "https://fgu03ut8lg.execute-api.us-east-1.amazonaws.com/dev";

const initialState = {
  user: {},
  status: 'idle',
};

export const getUserAsync = createAsyncThunk(
  'user/GetUser',
  async (id) => {
    const response = await axios.get(`${BASE_URL}/auth/user`, id);
    return response.data;
  }
);

export const createUserAsync = createAsyncThunk(
  'user/CreateUser',
  async (name, email, password) => {
    const response = await axios.get(`${BASE_URL}/users`, email, name, password);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
