import React, { useState } from "react";
import "../Component/incomeForm.css"

function IncomeForm({addIncome, onClickAddExpensebtn})
{
    const [income, setIncome] = useState(0);

    const handleSubmit =(e) => {
     e.preventDefault();
     addIncome(parseFloat(income));
     setIncome('');
     onClickAddExpensebtn();
    }

    const handleCancel =() => {
        setIncome('');
        onClickAddExpensebtn();
    }
    const handleClickinside =(e) => {
  e.stopPropagation();
    }
    return(
        <div className="incbal" onClick={onClickAddExpensebtn}>
        <h2 className="income">Add Balance</h2>
        <form onSubmit={handleSubmit} className="incform" onClick={handleClickinside}>
        <input type="number" placeholder="Income Amount" value={income} onChange={(e) => setIncome(e.target.value)}  className="amount"required/>
        <button type="submit" className="incomebutton">Add balance</button>
        <button type="submit" onClick={handleCancel} className="cancelbutton">Cancel</button>
        </form>
        </div>
    )
}
export default IncomeForm;