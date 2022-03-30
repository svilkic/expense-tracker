import React from "react";
// Styles
import styles from "./navbar.module.css";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeDark } from "store/slices/uiSlice";
import { setFetch } from "store/slices/expenseSlice";

export function ExpenseNavbar() {
  const dispatch = useDispatch();
  const { dark } = useSelector((state) => state.ui);

  const handleThemeChange = () => {
    dispatch(changeDark());
  };
  return (
    <div>
      {dark ? (
        <BsFillSunFill className={styles.button} onClick={handleThemeChange} />
      ) : (
        <BsFillMoonFill className={styles.button} onClick={handleThemeChange} />
      )}
      {/* <button onClick={() => dispatch(setFetch())}>Fetch False</button> */}
    </div>
  );
}
