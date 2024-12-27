import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as udacityApi from "../service/_DATA";
import { User } from "../config/types";

// Async action để tải danh sách người dùng
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await udacityApi._getUsers();
  return response;
});


const userSlice = createSlice({
  name: "users",
  initialState: {
    users: {} as Record<string, User>, 
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
