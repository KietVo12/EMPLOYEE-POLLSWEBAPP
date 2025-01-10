import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { Question } from "../models/question";
import { RootState } from "../../../store";
import { saveQuestion } from "../../../apis/api";
import IState from "../../../types/state";
import LoadingStatus from "../../../types/loading_status";
import { saveQuestionToUser } from "../../users";

export const handleAddQuestion = createAsyncThunk<
  Question,
  { optionOneText: string; optionTwoText: string },
  { state: RootState }
>(
  "questions/handleAddQuestion",
  async (question, { getState, dispatch, rejectWithValue }) => {
    try {
      const authedUser = getState().authedUser.entities;

      if (!authedUser)
        throw new Error("cannot add question: user is not authenticated");
      const savedQuestion = await saveQuestion({
        ...question,
        author: authedUser,
      });
      dispatch(
        saveQuestionToUser({ authedUser: authedUser, qid: savedQuestion.id })
      );
      return savedQuestion;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const handleAddQuestionReducer = (
  builder: ActionReducerMapBuilder<IState<Record<string, Question>>>
) => {
  builder.addCase(handleAddQuestion.fulfilled, (state, { payload }) => {
    state.entities = {
      ...state.entities,
      [payload.id]: payload,
    };
    
    state.loading = LoadingStatus.succeeded;
  });
  builder.addCase(handleAddQuestion.rejected, (state, { error }) => {
    state.loading = LoadingStatus.failed;
    state.error = error.message;
  });
  builder.addCase(handleAddQuestion.pending, (state) => {
    state.loading = LoadingStatus.pending;
  });
};
