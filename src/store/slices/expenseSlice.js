import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { filterArrayByDate } from "util/helpers";

const initialState = {
  amount: 0,
  //income: 0,
  //expense: 0,
  expenseList: [],
  fetching: true,
};

//Get all epxenses
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpensesByDate",
  async (thunkAPI) => {
    let existing = localStorage.getItem("expensesList");
    let amount = parseFloat(localStorage.getItem("amount")) || 0;
    existing = existing ? JSON.parse(existing) : [];
    return { expenseList: existing, amount };
  }
);

//Get epxenses by date
export const fetchExpensesByDate = createAsyncThunk(
  "expenses/fetchExpensesByDate",
  async ({ month, year }) => {
    let existing = JSON.parse(localStorage.getItem("expensesList")) || [];
    existing = filterArrayByDate(existing, month, year);
    let amount = calculateAmount(existing);
    return { expenseList: existing, amount };
  }
);

//Add Expense
export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expense, thunkAPI) => {
    //Get items from storage
    let existing = localStorage.getItem("expensesList");
    existing = existing ? JSON.parse(existing) : [];
    //Add new item
    existing.push(expense);
    //Calculate new amount
    let calculatedAmount = calculateAmount(existing);
    //Save items and amount
    localStorage.setItem("expensesList", JSON.stringify(existing));
    localStorage.setItem("amount", calculatedAmount);

    return { expenseList: existing, amount: calculatedAmount };
  }
);

//Delete expense
export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id, thunkAPI) => {
    //Get items from storage
    let expenseList = JSON.parse(localStorage.getItem("expensesList"));
    //Find expense
    let index = expenseList.findIndex((expense) => expense.id === id);
    //Remove from list
    expenseList.splice(index, 1);
    //Calculate new amount
    let calculatedAmount = calculateAmount(expenseList);
    //Save items and amount
    localStorage.setItem("expensesList", JSON.stringify(expenseList));
    localStorage.setItem("amount", calculatedAmount);

    return { expenseList, amount: calculatedAmount };
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setFetch: (state, action) => {
      state.fetching = false;
    },
  },
  extraReducers: (builder) => {
    //Get
    builder.addCase(fetchExpensesByDate.fulfilled, (state, action) => {
      state.expenseList = action.payload.expenseList;
      state.amount = action.payload.amount;
      state.fetching = false;
      console.log("done fetching");
    });
    builder.addCase(fetchExpensesByDate.pending, (state, action) => {
      state.fetching = true;
      console.log("fetching...");
    });
    //Add
    builder.addCase(addExpense.fulfilled, (state, action) => {
      state.amount = action.payload.amount;
      state.expenseList = action.payload.expenseList;
    });
    //Delete
    builder.addCase(deleteExpense.fulfilled, (state, action) => {
      state.amount = action.payload.amount;
      state.expenseList = action.payload.expenseList;
    });
  },
});

const calculateAmount = (list) => {
  return list.reduce((sum, obj) => (sum += obj.amount), 0);
};

export const { setFetch } = expenseSlice.actions;
export const expenceReducer = expenseSlice.reducer;
