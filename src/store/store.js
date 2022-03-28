import { expenceReducer } from "./slices/expenseSlice";
import { themeReducer } from "./slices/themeSlice";

const { configureStore } = require("@reduxjs/toolkit");

const reducer = {
  expenses: expenceReducer,
  theme: themeReducer,
};

export const store = configureStore({
  reducer,
});
