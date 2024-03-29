import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Expense.css";

function ExpenseForm({
  addExpense,
  selectedExpense,
  updateExpense,
  setSelectedExpense,
  onClickAddExpensebtn,
  showBackdrop,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (selectedExpense) {
      setTitle(selectedExpense.title || "");
      setAmount(selectedExpense.amount || "");
      setCategory(selectedExpense.category || "");
      setDate(selectedExpense.date || "");
    } else {
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    }
  }, [selectedExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle", title,amount,category,date)
    if (selectedExpense) {
        console.log("update", selectedExpense.id);
      updateExpense(selectedExpense.id, {
       
        id: selectedExpense.id,
        title,
        amount: parseFloat(amount),
        category,
        date,
      });
      setSelectedExpense(null);
    } else {
      addExpense({
        id: Date.now(),
        title,
        amount: parseFloat(amount),
        category,
        date,
      });
    }
    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
    onClickAddExpensebtn();
  };

  const handleCancel = () => {
    setSelectedExpense(null);
  };
  return (
    <div className={`Expense ${showBackdrop ? 'show-backdrop' : ''}`} >
      <h2>{selectedExpense ? "Edit Expense" : "Add Expense"}</h2>
      <form onSubmit={handleSubmit} className="from">
        <div className="formrow">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="text"
            required
          />
          <input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Price"
            className="price"
            required
          />
        </div>
        <div className="formrow">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select"
          >
            <option value="">select category</option>
            <option value="food">Food</option>
            <option value="movie">Movie</option>
            <option value="transporation">Transporation</option>
            <option value="shopping">Shopping</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date"
            required
          />
        </div>
        <div className="formrow">
          <button type="submit" className="btn">
            AddExpense
          </button>
          <button onClick={handleCancel} type="cancel" className="cbtn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default ExpenseForm;
