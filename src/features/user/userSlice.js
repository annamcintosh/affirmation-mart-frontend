import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://fgu03ut8lg.execute-api.us-east-1.amazonaws.com/dev";

const initialState = {
  user: null,
  isAuthenticated: null,
  token: localStorage.getItem("token"),
  status: "idle",
};

export const signInAsync = createAsyncThunk(
  "user/SignIn",
  async (email, password) => {
    const response = await axios.get(`${BASE_URL}/auth/user`, {
      email,
      password,
    });
    return response.data;
  }
);

export const signUpAsync = createAsyncThunk(
  "user/SignUp",
  async (name, email, password) => {
    return await axios.post(`${BASE_URL}/users`, {
      name,
      email,
      password,
    });
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.status = "idle";
      state.user = null;
      state.isAuthenticated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.status = "idle";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signUpAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.status = "idle";
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export default userSlice.reducer;
