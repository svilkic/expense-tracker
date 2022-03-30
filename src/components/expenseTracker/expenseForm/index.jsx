import React, { useState } from "react";
// Libs
import { useDispatch } from "react-redux";
import { addExpense } from "store/slices/expenseSlice";
import { generateID } from "util/helpers";
// Components
import { Title } from "components/expenseTracker/ui/title";
// Constants
import { categories } from "constants/categories";
// Styles
import styles from "./form.module.css";

const todayDate = new Date().toISOString().split("T")[0];

export function ExpenseForm() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(todayDate);
  const [category, setCategory] = useState({
    name: categories[0].name,
    color: categories[0].color,
  });

  const [isHidden, setIsHidden] = useState(true);
  const [error, setError] = useState("");

  const isValid = amount && title.trim().length > 0 && date;

  const formSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!isValid) {
      setError("Can't add empty expense");
      return;
    }
    const newExpense = {
      id: generateID(),
      amount,
      title,
      description,
      category: category.name,
      categoryColor: category.color,
      date,
    };
    dispatch(addExpense(newExpense));
    clearForm();
  };

  const clearForm = () => {
    setAmount(0);
    setTitle("");
    setDate(todayDate);
    setDescription("");
  };

  const setCategoryHandler = (e) => {
    const category = categories.find((c) => c.id === e.target.value);
    setCategory(category);
  };

  return (
    <div className={styles.container}>
      <Title
        title="Add Experience"
        hidden={isHidden}
        onClick={() => setIsHidden(!isHidden)}
      />
      {error ? <p className="error">{error}</p> : undefined}
      <form
        className={`${styles.form} ${isHidden ? styles.hidden : ""}`}
        onSubmit={formSubmit}
      >
        <input
          id="title"
          type="text"
          placeholder="Title *"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          id="description"
          placeholder="Description "
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          maxLength={300}
        />
        <input
          id="price"
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(parseInt(e.target.value));
          }}
        />
        <select id="category" onChange={setCategoryHandler}>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <input type="submit" value="Add Expense" />
      </form>
    </div>
  );
}
