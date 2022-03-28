import React from "react";
import { useSelector } from "react-redux";
// Styles
import styles from "./expenseList.module.css";

export function ExpenseList() {
  const { expenseList } = useSelector((state) => state.expenses);
  return (
    <div className={styles.container}>
      <h3>Expense List</h3>
      <ul className={styles.list}>
        {expenseList.map((expense) => (
          <li key={expense.id}>{expense.title}</li>
        ))}
      </ul>
    </div>
  );
}
