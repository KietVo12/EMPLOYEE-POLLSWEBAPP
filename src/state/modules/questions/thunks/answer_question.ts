import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { Question } from "../models/question";
import { RootState } from "../../../store";
import { saveQuestionAnswer } from "../../../apis/api";
import IState from "../../../types/state";
import LoadingStatus from "../../../types/loading_status";
import Answer from "../../../types/answer";
import { saveAnswerToUser } from "../../users";

export const handleAnswerQuestion = createAsyncThunk<
  {
    qid: string;
    answer: Answer;
    authedUser: string;
  },
  {
    qid: string;
    answer: Answer;
  },
  { state: RootState }
>(
  "questions/handleAnswerQuestion",
  async (info, { getState, rejectWithValue, dispatch }) => {
    try {
      const authedUser = getState().authedUser.entities;
      if (!authedUser)
        throw new Error("cannot answer question: user is not authenticated");
      const answer = { ...info, authedUser: authedUser };

      await saveQuestionAnswer(answer);
      dispatch(saveAnswerToUser(answer));

      return answer;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const handleAnswerQuestionReducer = (
  builder: ActionReducerMapBuilder<IState<Record<string, Question>>>
) => {
  builder.addCase(handleAnswerQuestion.fulfilled, (state, { payload }) => {
    state.entities = {
      ...state.entities,
      [payload.qid]: {
        ...state.entities[payload.qid],
        [payload.answer]: {
          ...state.entities[payload.qid][payload.answer],
          votes: state.entities[payload.qid][payload.answer].votes.concat([
            payload.authedUser,
          ]),
        },
      },
    };
    state.loading = LoadingStatus.succeeded;
  });
  builder.addCase(handleAnswerQuestion.rejected, (state, { error }) => {
    state.loading = LoadingStatus.failed;
    state.error = error.message;
  });
  builder.addCase(handleAnswerQuestion.pending, (state) => {
    state.loading = LoadingStatus.pending;
  });
};
