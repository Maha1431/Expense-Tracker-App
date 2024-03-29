import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "./ExpenseTrends.css"

function ExpenseTrends({ expense }) {
  

  //  Group Exense by Category
  const expensebyCategory = expense.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const data = Object.keys(expensebyCategory).map((category) => ({
    category,
    amount: expensebyCategory[category],
  }));



  return (
    <div className="trends">
      <h2 className="total">Total Expensess</h2>
      <BarChart width={500} height={200} data={data}layout="vertical" className="bar">
        <XAxis type="number" hide/>
        <YAxis dataKey="category" type="category"/>
        <Tooltip />
        <Bar dataKey="amount" fill="#8784D2" />
      </BarChart>
    </div>
  );
}
export default ExpenseTrends;
