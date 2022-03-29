import { createSlice } from "@reduxjs/toolkit";

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const initialState = { dark: false, currentMonth, currentYear };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    change(state) {
      state.dark = !state.dark;
    },
  },
});

export const { change } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
