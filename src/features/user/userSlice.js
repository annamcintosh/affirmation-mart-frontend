import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://fgu03ut8lg.execute-api.us-east-1.amazonaws.com/dev";

const initialState = {
  user: null,
  isAuthenticated: null,
  status: "idle",
};

export const loadUserAsync = createAsyncThunk(
  "user/loadUser",
  async ({ user }) => {
    const id = user.data.id;
    console.log("GETUSER", id);
    return await axios.get(`${BASE_URL}/auth/user`, {
      id,
    });
  }
);

export const signInAsync = createAsyncThunk(
  "user/SignIn",
  async ({ email, password }) => {
    return await axios.get(`${BASE_URL}/auth`, {
      email,
      password,
    });
  }
);

export const signUpAsync = createAsyncThunk(
  "user/SignUp",
  async ({ name, email, password }) => {
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
      state.status = "idle";
      state.user = null;
      state.isAuthenticated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signInAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signUpAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
