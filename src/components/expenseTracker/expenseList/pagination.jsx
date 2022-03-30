import React from "react";
// Styles
import styles from "./pagination.module.css";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

export function Pagination({ currentPage = 1, numberOfPages, perPage = 1 }) {
  //   const numberOfPages = Math.ceil(length / perPage);
  return (
    <div className={styles.container}>
      <IoMdArrowDropleft className={styles.button} onClick={() => {}} />
      {currentPage}&nbsp;/&nbsp;{numberOfPages}
      <IoMdArrowDropright className={styles.button} onClick={() => {}} />
    </div>
  );
}
