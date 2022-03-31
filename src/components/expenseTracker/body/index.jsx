import React from "react";
import { ExpenseChart } from "../expenseChart";
import { ExpenseForm } from "../expenseForm";
import { ExpenseList } from "../expenseList";
// Styles
import styles from "./body.module.css";

export function ExpenseBody() {
  return (
    <div className={styles.container}>
      <ExpenseForm />
      <ExpenseList />
      <ExpenseChart />
    </div>
  );
}
