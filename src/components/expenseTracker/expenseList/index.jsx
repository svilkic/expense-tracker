import React, { useState } from "react";
import { useSelector } from "react-redux";
// Components
import { ExpenseItem } from "./expenseItem";
import { Title } from "components/expenseTracker/ui/title";
import { Spinner } from "components/expenseTracker/ui/spinner";
import { Pagination } from "./pagination";
// Styles
import styles from "./expenseList.module.css";

const perPage = 2;

export function ExpenseList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { expenseList, fetching } = useSelector((state) => state.expenses);
  const numberOfPages = Math.ceil(expenseList.length / perPage);
  const [isHidden, setIsHidden] = useState();
  /*const list = expenseList.filter((el, i) => {
    const index = i + 1;
    if (index < currentPage * perPage) return el;
  });

  console.log(list);
*/
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
      <Pagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        perPage={perPage}
      />
      {fetching && <Spinner />}
    </div>
  );
}
