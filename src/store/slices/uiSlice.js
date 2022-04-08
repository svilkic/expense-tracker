import { createSlice } from "@reduxjs/toolkit";

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const initialState = {
  dark: false,
  currentMonth,
  currentYear,
  authenticated: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeDark(state) {
      state.dark = !state.dark;
    },
    setUser(state, action) {
      const { payload = true } = action;
      state.authenticated = payload;
    },
  },
});

export const { changeDark, setUser } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
