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
    const id = user.id;
    const response = await axios.post(`${BASE_URL}/auth/user`, {
      id,
    });
    return response.data;
  }
);

export const signInAsync = createAsyncThunk(
  "user/SignIn",
  async ({ email, password }) => {
    const response = await axios.post(`${BASE_URL}/auth`, {
      email,
      password,
    });
    return response.data;
  }
);

export const signUpAsync = createAsyncThunk(
  "user/SignUp",
  async ({ name, email, password }) => {
    const response = await axios.post(`${BASE_URL}/users`, {
      name,
      email,
      password,
    });
    return response.data;
  }
);

export const placeOrderAsync = createAsyncThunk(
  "order/PlaceOrder",
  async ({ user }) => {
    const orderId = user.shoppingOrder;
    const userId = user.id;
    const response = await axios.patch(`${BASE_URL}/order/place/${orderId}`, {
      userId,
    });
    console.log(response.data);
    const newResponse = {
      id: response.data.id,
      name: response.data.data,
      shoppingOrder: response.data.shoppingOrder,
    };
    console.log(newResponse);
    return newResponse;
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
      })
      .addCase(placeOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
