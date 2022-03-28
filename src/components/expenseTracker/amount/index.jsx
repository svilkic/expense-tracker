import React from "react";
// Libs
import { useSelector } from "react-redux";
// Styles
import styles from "./amount.module.css";

export function ExpenseAmount({}) {
  const { amount } = useSelector((state) => state.expenses);
  const formatAmount = amount.toFixed(2);
  return (
    <div className={styles.container}>
      <p>
        {formatAmount} &nbsp;
        {process.env.REACT_APP_CURRENCY}
      </p>
    </div>
  );
}
