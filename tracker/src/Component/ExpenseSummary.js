import React from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

function ExpenseSummary({ expense }) {
  
  //  Group Exense by Category
  const expensebyCategory = expense.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});
//  define category color
const categorycolor = {
    movie:" #FF9304",
    food:"#A000FF",
    transporation: " #FDE006",
    shopping:"#FF0493"
    
}
  const data = Object.keys(expensebyCategory).map((category) => ({
    category,
    amount: expensebyCategory[category],
    color : categorycolor[category]
  }));

  const RADIAN = Math.PI /180
const renderLabel = ({cx, cy,midAngle, innerRadius, outerRadius, percent}) => {
    
    const radius = innerRadius +( outerRadius - innerRadius)* 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return(
        <text
        x={x}
        y ={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}% `}
        </text>
    )
}
  return (
    <div className="summary">
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={80}
          labelLine= {false}
          fill="#8884d8"
          label={renderLabel}
        >
        {data.map((entry,idx) => {
           return <Cell key={`cell-${idx}`} fill={entry.color} />
        })}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}



export default ExpenseSummary;
