import React, { useState } from "react";
// Styles
import styles from "./expenseItem.module.css";
// Contstants
import { categories } from "constants/categories";

export function ExpenseItem({ expense }) {
  const [isHidden, setIsHidden] = useState(true);

  const color = categories[expense.category];
  console.log(color);

  return (
    <li className={styles.item} style={{ borderColor: color }}>
      <div
        className={styles.title}
        onClick={() => setIsHidden((prev) => !prev)}
      >
        <span>{expense.title}</span>
        <span>
          {expense.amount}
          {process.env.REACT_APP_CURRENCY}
        </span>
      </div>
      <div className={`${styles.info} ${isHidden ? styles.hidden : ""}`}>
        <p className={styles.date}>Date: {expense.date}</p>
        <p className={styles.category}>Category: {expense.category}</p>
        <p className={styles.description}>{expense.description}</p>
      </div>
    </li>
  );
}
