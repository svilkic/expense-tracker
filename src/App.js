import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "store/slices/expenseSlice";
import { Tracker } from "./pages/Tracker";

function App() {
  const dispatch = useDispatch();
  const { dark } = useSelector((state) => state.ui);

  useEffect(() => {
    //dispatch(fetchExpenses([]));
  }, []);

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    if (dark) body.classList.add("dark");
    else body.classList.remove("dark");
  }, [dark]);

  return (
    <div className={dark ? "dark" : ""}>
      <Tracker />
    </div>
  );
}

export default App;
