import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ filters = {}, page = 1, limit = 4 }, { rejectWithValue }) => {
    try {
      const params = { page, limit };

      Object.entries(filters).forEach(([key, value]) => {
        if (typeof value === "boolean" && value) {
          params[key] = value;
        } else if (typeof value === "string" && value.trim()) {
          params[key] = value;
        }
      });

      const response = await axios.get(API_BASE_URL, {
        params,
        validateStatus: (status) => status >= 200 && status < 500,
      });

      if (response.status === 404) {
        return { items: [], total: 0, page };
      }

      const items = Array.isArray(response.data)
        ? response.data
        : response.data.items || [];

      const totalFromHeader = Number(response.headers["x-total-count"]);
      const totalFromApi = response.data.total;

      return {
        items,
        total: totalFromHeader || totalFromApi || null,
        page,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    total: 0,
    page: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (action.payload.page === 1) {
          state.items = action.payload.items;
          if (action.payload.total !== null) {
            state.total = action.payload.total;
          }
        } else {
          state.items = [...state.items, ...action.payload.items];
        }

        state.page = action.payload.page;
      })

      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default campersSlice.reducer;
