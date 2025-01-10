import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Answer from "../../types/answer";
import LoadingStatus from "../../types/loading_status";
import IState from "../../types/state";
import { User } from "./models/user";

export const initialState: IState<Record<string, User>> = {
  entities: {},
  loading: LoadingStatus.idle,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    receiveUsers(state, action: PayloadAction<Record<string, User>>) {
      state.entities = { ...state.entities, ...action.payload };
      state.loading = LoadingStatus.succeeded;
    },
    saveAnswerToUser(
      state,
      action: PayloadAction<{ authedUser: string; qid: string; answer: Answer }>
    ) {
      const { qid, authedUser, answer } = action.payload;
      state.entities = {
        ...state.entities,
        [authedUser]: {
          ...state.entities[authedUser],
          answers: {
            ...state.entities[authedUser].answers,
            [qid]: answer,
          },
        },
      };
    },
    saveQuestionToUser(
      state,
      action: PayloadAction<{ authedUser: string; qid: string }>
    ) {
      const { qid, authedUser } = action.payload;
      state.entities = {
        ...state.entities,
        [authedUser]: {
          ...state.entities[authedUser],
          questions: state.entities[authedUser].questions.concat([qid]),
        },
      };
    },
  },
});

export const { receiveUsers, saveAnswerToUser, saveQuestionToUser } =
  usersSlice.actions;

export default usersSlice.reducer;
