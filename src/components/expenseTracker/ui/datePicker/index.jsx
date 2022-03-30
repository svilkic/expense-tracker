import React, { useEffect, useState } from "react";
// Libs
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { fetchExpensesByDate } from "store/slices/expenseSlice";
import { useDispatch } from "react-redux";
// Constants
import { months } from "constants/dates";
//Styles
import styles from "./datePicker.module.css";

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

export function DatePicker() {
  const dispatch = useDispatch();
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const changeDateHanlder = (type = "+") => {
    let newMonth = month;
    let newYear = year;

    if (type === "+") {
      newMonth += 1;
      if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
      }
    } else if (type === "-") {
      newMonth -= 1;
      if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
      }
    }
    setMonth(newMonth);
    setYear(newYear);
  };

  const resetDate = () => {
    setMonth(currentMonth);
    setYear(currentYear);
  };

  // OPTIMIZE
  useEffect(() => {
    let changeInterval = setTimeout(() => {
      dispatch(fetchExpensesByDate({ month, year }));
    }, 500);

    return () => {
      clearInterval(changeInterval);
    };
  }, [month, year]);

  const RenderMonths = () => {
    return (
      <span
        className={styles.date}
        onClick={resetDate}
      >{`${months[month]} ${year}`}</span>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.datePicker}>
        <IoMdArrowDropleft
          className={styles.button}
          onClick={() => changeDateHanlder("-")}
        />
        <RenderMonths />
        <IoMdArrowDropright
          className={styles.button}
          onClick={() => changeDateHanlder("+")}
        />
      </div>
    </div>
  );
}
