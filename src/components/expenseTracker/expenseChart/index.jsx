import React, { useState } from "react";
import { Title } from "../ui/title";
// Styles
import styles from "./expenseChart.module.css";
import { PieChart } from "react-minimal-pie-chart";
import { useSelector } from "react-redux";
import { groupByAndSum } from "util/helpers";

export function ExpenseChart() {
  const [isHidden, setIsHidden] = useState(true);
  const { expenseList } = useSelector((state) => state.expenses);
  const grouped = groupByAndSum(expenseList, "category");
  console.log(grouped);

  return (
    <div className={styles.container}>
      <Title
        title="Expense Chart"
        hidden={isHidden}
        onClick={() => {
          setIsHidden((prev) => !prev);
        }}
      />
      <div className={`${styles.chart} ${isHidden ? styles.hidden : ""}`}>
        <PieChart
          data={[
            { title: "One", value: 10, color: "#E38627" },
            { title: "Two", value: 15, color: "#C13C37" },
            { title: "Three", value: 20, color: "#6A2135" },
          ]}
        />
      </div>
    </div>
  );
}
