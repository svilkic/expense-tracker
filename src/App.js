import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchExpenses } from "store/slices/expenseSlice";
import { Tracker } from "./pages/Tracker";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExpenses([]));
  }, []);

  return (
    <>
      <Tracker />
    </>
  );
}

export default App;
