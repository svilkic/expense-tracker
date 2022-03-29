import React, { useState } from "react";
import { useSelector } from "react-redux";
// Components
import { ExpenseItem } from "./expenseItem";
import { Title } from "components/expenseTracker/ui/title";
// Styles
import styles from "./expenseList.module.css";

export function ExpenseList() {
  const { expenseList } = useSelector((state) => state.expenses);
  const [isHidden, setIsHidden] = useState();
  return (
    <div className={styles.container}>
      <Title
        title="Expense List"
        hidden={isHidden}
        onClick={() => {
          setIsHidden((prev) => !prev);
        }}
      />
      <ul className={`${styles.list} ${isHidden ? styles.hidden : ""}`}>
        {expenseList.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </ul>
    </div>
  );
}
