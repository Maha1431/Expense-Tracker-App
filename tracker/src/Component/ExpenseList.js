import React  from "react";
import "./ExpenseList.css";
import {BiTrash, BiEdit} from "react-icons/bi";
import {CiGift} from "react-icons/ci"

function Expenselist({expense, deleteExpense, updateExpense})
{
    // console.log(expense);
    return(
        <div>
            <h2 className="heading">Recent Transaction</h2>
            <div>
            <ul>
                {expense.map((expenseItem) => {
                    if(!expenseItem)
                    {
                        return null
                    }
                     return (
                     <li key={expenseItem.id} className="lists">
                        <CiGift />
                        <div className="list-details">
                            <span className="category">{expenseItem.category}</span>
                            <span className="date"> {expenseItem.date} </span>
                        </div>    
                        <div className="list1-details">
                            <span className="amount">₹{expenseItem.amount}</span>
                       <button onClick={() => deleteExpense(expenseItem.id)} className="delete"><BiTrash /></button>
                       <button onClick={() => updateExpense(expenseItem.id)} className="update"><BiEdit /></button>
                       </div>
                    </li>)
                })}
            </ul>
            </div>
        </div>
    )
}
export default Expenselist;