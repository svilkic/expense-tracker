import React, { useState } from "react";
import { Title } from "../ui/title";
import { PieChart } from "react-minimal-pie-chart";
import { useSelector } from "react-redux";
import { groupByAndSum } from "util/helpers";
import { useMemo } from "react";
import { PiLegend, MemoizedLegend } from "./PiLegend";
// Styles
import styles from "./expenseChart.module.css";
import { useEffect } from "react";

export function ExpenseChart() {
  const [isHidden, setIsHidden] = useState(true);
  const { expenseList } = useSelector((state) => state.expenses);

  //OPTIMIZE
  const grouped = useMemo(() => {
    if (expenseList.length > 0)
      return groupByAndSum(expenseList, "category").sort(
        (a, b) => b.value - a.value
      );
    return [];
  }, [expenseList]);

  useEffect(() => {
    console.log("re-render");
  });

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
          className={styles.pychart}
          label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}% `}
          labelStyle={{
            fontSize: "0.5rem",
          }}
          lineWidth={60}
          labelPosition={112}
          data={grouped}
          text="aleksa"
        />
        <MemoizedLegend data={grouped} />
      </div>
    </div>
  );
}
