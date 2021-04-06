import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://fgu03ut8lg.execute-api.us-east-1.amazonaws.com/dev";

export const GetUser = createAsyncThunk(
  "user/getUsers",
  async (id) => await axios.get(`${BASE_URL}/user/id`, id)
);

export const CreateUser = createAsyncThunk(
  "user/createuser",
  async (user) => await axios.post(`${BASE_URL}/user/create/id`, user)
);