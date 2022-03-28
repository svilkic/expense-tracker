import { ExpenseList } from "components/expenseList";
import React from "react";
import ExpenseForm from "../expenseForm";
// Styles
import styles from "./body.module.css";

export function ExpenseBody() {
  return (
    <div className={styles.container}>
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
}
