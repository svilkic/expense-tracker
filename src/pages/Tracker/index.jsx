import React from "react";
// Styles
import styles from "./tracker.module.css";

// Components
import { ExpenseAmount } from "components/expenseTracker/amount";
import { ExpenseBody } from "components/expenseTracker/body";
import { ExpenseNavbar } from "components/expenseTracker/navbar";

export function Tracker() {
  return (
    <div className={styles.container}>
      <ExpenseNavbar />
      <ExpenseAmount />
      <ExpenseBody />
    </div>
  );
}
