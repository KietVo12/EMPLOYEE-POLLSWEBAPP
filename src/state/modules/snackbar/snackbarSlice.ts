import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ISnackbarState {
  message: string | null;
  isOpen: boolean;
}

const initialState: ISnackbarState = {
  message: null,
  isOpen: false,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: initialState,
  reducers: {
    setSnackbar(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.isOpen = true;
    },
    clearSnackbar(state) {
      state.isOpen = false;
    },
  },
});

export const { setSnackbar, clearSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
