import React from "react";
//Styles
import styles from "./datePicker.module.css";
// Constants
import { months, years } from "constants/dates";

export function DatePicker() {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  console.log(currentMonth);
  console.log(currentYear);
  return (
    <div className={styles.container}>
      <select id="months">
        {months.map((m) => (
          <option key={m.id} selected={currentMonth === m.id ? true : false}>
            {m.name}
          </option>
        ))}
      </select>
      <select id="years">
        {years.map((y) => (
          <option key={y} selected={currentYear === y ? true : false}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
