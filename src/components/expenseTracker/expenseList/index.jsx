import React, { useState } from "react";
import { useSelector } from "react-redux";
// Components
import { ExpenseItem } from "./expenseItem";
import { Title } from "components/expenseTracker/ui/title";
import { Spinner } from "components/expenseTracker/ui/spinner";
import { Pagination } from "./pagination";
import { usePaging } from "hooks/usePaging";
// Styles
import styles from "./expenseList.module.css";
import { useEffect } from "react";

const itemsPerPage = 5;

export function ExpenseList() {
  const [isHidden, setIsHidden] = useState();
  const { expenseList, fetching } = useSelector((state) => state.expenses);
  const { currentPage, numberOfPages, changePage, items } = usePaging(
    expenseList,
    itemsPerPage
  );

  useEffect(() => {
    changePage(1);
  }, [expenseList]);

  return (
    <div className={styles.container}>
      <Title
        title="Expense List"
        hidden={isHidden}
        onClick={() => {
          setIsHidden((prev) => !prev);
        }}
      />
      <div className={isHidden ? styles.hidden : ""}>
        {items.length === 0 && !fetching && (
          <p>There are no expenses. Congrats!</p>
        )}
        {!fetching && (
          <ul className={`${styles.list}`}>
            {items?.map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))}
          </ul>
        )}
        {numberOfPages > 1 && (
          <Pagination
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            perPage={itemsPerPage}
            changePage={changePage}
          />
        )}
      </div>
      {fetching && <Spinner />}
    </div>
  );
}
