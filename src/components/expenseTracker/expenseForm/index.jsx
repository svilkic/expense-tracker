import React, { useState } from "react";
// Libs
import { useDispatch } from "react-redux";
import { addExpense } from "store/slices/expenseSlice";
import { generateID } from "util/helpers";
// Constants
import { categories } from "constants/categories";
// Styles
import styles from "./form.module.css";

export default function ExpenseForm() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0].name);

  const formSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: generateID(),
      amount,
      title,
      description,
      category,
    };
    console.log(newExpense);
    dispatch(addExpense(newExpense));
  };

  return (
    <div className={styles.container}>
      <h3>Add Expense</h3>
      <form onSubmit={formSubmit}>
        <input
          id='title'
          type='text'
          placeholder='Title *'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          id='description'
          placeholder='Description *'
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          id='price'
          type='number'
          value={amount}
          onChange={(e) => {
            setAmount(parseInt(e.target.value));
          }}
        />
        <select
          id='category'
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {categories.map((cat) => (
            <option key={cat.id}>{cat.name}</option>
          ))}
        </select>
        <input type='submit' value='Add Expense' />
      </form>
    </div>
  );
}
