import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { ExpenseItem } from './expenseItem';
import { Title } from 'components/expenseTracker/ui/title';
import { Spinner } from 'components/expenseTracker/ui/spinner';
import { Pagination } from './pagination';
import { usePaging } from 'hooks/usePaging';
// Styles
import styles from './expenseList.module.css';
import { useEffect } from 'react';
import { PageNumberList } from './pageNumberList';
import { printOff } from 'store/slices/uiSlice';

const defaultItemsPerPage = 5;

export function ExpenseList() {
  const dispatch = useDispatch();
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [isHidden, setIsHidden] = useState();
  const { expenseList, fetching, filterBy } = useSelector(
    (state) => state.expenses
  );
  const { printMode } = useSelector((state) => state.ui);
  const { currentPage, numberOfPages, changePage, items } = usePaging(
    expenseList,
    itemsPerPage
  );

  useEffect(() => {
    changePage(1);
    // console.log(expenseList);
  }, [expenseList, filterBy]);

  useEffect(() => {
    if (printMode) {
      changePage(1);
      setItemsPerPage(1000);
    }
  }, [printMode]);

  useEffect(() => {
    if (printMode) {
      setTimeout(() => {
        window.print();
        dispatch(printOff());
        setItemsPerPage(defaultItemsPerPage);
      }, 100);
    }
    changePage(1);
  }, [itemsPerPage]);

  return (
    <div className={styles.container}>
      <Title
        title='Expense List'
        hidden={isHidden}
        onClick={() => {
          setIsHidden((prev) => !prev);
        }}
      />
      <div className={isHidden ? styles.hidden : ''}>
        {items.length === 0 && !fetching && (
          <p>There are no expenses. Congrats!</p>
        )}
        <PageNumberList perPage={itemsPerPage} onClick={setItemsPerPage} />
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
      <div className={styles.pageBreak}></div>
    </div>
  );
}
