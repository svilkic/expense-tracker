import { createSlice } from "@reduxjs/toolkit";

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const initialState = { dark: false, currentMonth, currentYear };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeDark(state) {
      state.dark = !state.dark;
    },
  },
});

export const { changeDark } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
