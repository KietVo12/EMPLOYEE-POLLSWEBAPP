import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import LoadingStatus from "../../types/loading_status";
import IState from "../../types/state";

const initialState: IState<string | null> = {
  entities: null,
  loading: LoadingStatus.idle,
};

const authedUserSlice = createSlice({
  name: "authedUser",
  initialState: initialState as IState<string | null>,
  reducers: {
    setAuthedUser(state, action: PayloadAction<string>) {
      state.entities= action.payload
      state.loading=LoadingStatus.succeeded
    },
    logoutAuthedUser: () => initialState,
  },
});

export const { setAuthedUser, logoutAuthedUser } = authedUserSlice.actions;

export default authedUserSlice.reducer;
