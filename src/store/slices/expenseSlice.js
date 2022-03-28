import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
  income: 0,
  expense: 0,
  expenseList: [
    { id: 1, title: "Title", description: "", amount: 150, category: "hrana" },
  ],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense(state, action) {
      const { payload } = action;
      state.amount += payload.amount;
      state.expenseList.push(payload);
    },
    remove(state, action) {
      const { payload } = action;
    },
  },
});

export const { addExpense } = expenseSlice.actions;
export const expenceReducer = expenseSlice.reducer;
