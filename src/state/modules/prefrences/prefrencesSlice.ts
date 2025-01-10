import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkthemeEnabled: false,
};

const prefrencesSlice = createSlice({
  name: "prefrences",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.darkthemeEnabled = !state.darkthemeEnabled;
    },
  },
});

export const { toggleTheme } = prefrencesSlice.actions;

export default prefrencesSlice.reducer;
