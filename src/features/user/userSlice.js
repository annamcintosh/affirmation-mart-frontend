import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetUser, CreateUser } from './userAPI';

const initialState = {
  user: {},
  status: 'idle',
};

export const getUserAsync = createAsyncThunk(
  'user/getUser',
  async (email, password) => {
    const response = await GetUser(email, password);
    return response.data;
  }
);

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (name, email, password) => {
    const response = await CreateUser(name, email, password);
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
