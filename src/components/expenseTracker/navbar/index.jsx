import React from "react";
// Styles
import styles from "./navbar.module.css";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeDark, setUser } from "store/slices/uiSlice";
import { setFetch } from "store/slices/expenseSlice";
import { useNavigate } from "react-router-dom";

export function ExpenseNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dark } = useSelector((state) => state.ui);

  const handleThemeChange = () => {
    dispatch(changeDark());
  };
  return (
    <div className={styles.container}>
      {dark ? (
        <BsFillSunFill className={styles.button} onClick={handleThemeChange} />
      ) : (
        <BsFillMoonFill className={styles.button} onClick={handleThemeChange} />
      )}
      <BiLogIn
        className={styles.button}
        onClick={() => {
          dispatch(setUser(false));
          navigate("/login");
        }}
      />
      {/* <button onClick={() => dispatch(setFetch())}>Fetch False</button> */}
    </div>
  );
}
