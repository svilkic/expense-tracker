import { createSlice } from "@reduxjs/toolkit";

const initialState = { dark: false };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    change(state) {
      state.dark = !state.dark;
    },
  },
});

export const { change } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
