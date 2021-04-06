import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://fgu03ut8lg.execute-api.us-east-1.amazonaws.com/dev";

export const GetProducts = createAsyncThunk(
  "products/getProducts",
  async () => await axios.get(`${BASE_URL}/products`)
);

export const GetProduct = createAsyncThunk(
  "products/getProduct",
  async (id) => await axios.post(`${BASE_URL}/id`, id)
);
