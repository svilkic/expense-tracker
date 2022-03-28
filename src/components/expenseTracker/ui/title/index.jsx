import React from "react";
// Styles
import styles from "./title.module.css";

export function Title(props) {
  return (
    <div className={styles.title}>
      <h3>{props.title}</h3>
      {props.onClick ? <button onClick={props.onClick}>+</button> : undefined}
    </div>
  );
}
