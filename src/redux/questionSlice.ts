import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as udacityApi from "../service/_DATA";
import { Question } from "../config/types";

// Async action để tải danh sách câu hỏi
export const fetchQuestions = createAsyncThunk("questions/fetchQuestions", async () => {
  const response = await udacityApi._getQuestions();
  return response;
});

const questionSlice = createSlice({
  name: "questions",
  initialState: {
    questions: {} as Record<string, Question>, 
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default questionSlice.reducer;
