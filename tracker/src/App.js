import logo from "./logo.svg";
import "./App.css";
import ExpenseForm from "./Component/ExpenseForm";
import IncomeForm from "./Component/IncomeForm";
import Expenselist from "./Component/ExpenseList";
import { useEffect, useState } from "react";
import ExpenseSummary from "./Component/ExpenseSummary";
import ExpenseTrends from "./Component/ExpenseTrends";

function App() {
  const [walletbalance, setWalletbalance] = useState(5000);
  const [expensebalance, setExpensebalance] = useState(0);
  const [expense, setExpense] = useState([]);
  const [showIncomeform, setShowIncomeform] = useState(false);
  const [showExpenseform, setShowExpenseform] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const[showBackdrop, setShowBackdrop] =useState(false);

  
  useEffect(() => {
   const storage = JSON.parse(localStorage.getItem('expense'))
   console.log(storage)
   if(storage)
   {
    setExpense(storage);
   const totalExpense = storage.reduce((total, expense) => total + expense.amount, 0);
   setExpensebalance(totalExpense);
   // Update the wallet balance by subtracting the total expense from the initial balance
   setWalletbalance(walletbalance - totalExpense);
   }
   
  }, []);

  const addExpense = (newExpense) => {
   if(newExpense.amount > walletbalance)
   {
    alert('you dont have sufficient balance in your wallet');
    return;
   }

    const newExpenseTotal = expensebalance + newExpense.amount;
    //  update Expense Balance
    setExpensebalance(newExpenseTotal);
    //  update Wallet balance
    setWalletbalance(walletbalance - newExpense.amount);
    //  updateExpense list
    setExpense([...expense, newExpense]);
    localStorage.setItem("expense", JSON.stringify([...expense,newExpense]));
    setShowExpenseform(false);
  };
  //  update the Existing Expense
  const updateExpense = (id, update) => {
  const data = expense.map((item) => {
    return item.id === id? update : item
  })
  setExpense(data);
  setSelectedExpense(null);
  localStorage.setItem("expense", JSON.stringify(data));
  
  };

  const addIncome = (amount) => {
    const balance = walletbalance + amount
    setWalletbalance(balance);
    setShowIncomeform(false);
  };

  const deleteExpense = (id) => {
    const Expense = expense.filter((expense) => expense.id !== id);
    setExpense(Expense);
    localStorage.setItem("expense", JSON.stringify(Expense));
  };


  const handleButtonclick=() =>{
    setShowBackdrop(true)
  }

  const handleBackdrop =() => {
    setShowBackdrop(false);
  }


 
  return (
    <div className="App">
      <h2 className="h1">Expsense Tracker</h2>
      <div className="header">
      {showBackdrop && <div className="backdrop" onClick={handleBackdrop} />}
      <div className="balance">Walletbalance: ₹{walletbalance}
      <button onClick={() => { setShowIncomeform(!showIncomeform); handleButtonclick(); }} className="balbutton">
        + Add Income
      </button>
      </div>
      {showIncomeform && <IncomeForm addIncome={addIncome}  onClickAddExpensebtn = {handleBackdrop}/>}
      {showBackdrop && <div className="backdrop" onClick={handleBackdrop} />}
      <div className="expensebal">Expense: ₹{expensebalance}
      <button onClick={() => {setShowExpenseform(!showExpenseform); handleButtonclick(); }} className="expensebutton">
        {" "}
        +Add Expense
      </button>
      </div>
      {showExpenseform || selectedExpense ? (
        <ExpenseForm
          addExpense={addExpense}
          selectedExpense={selectedExpense}
          updateExpense={updateExpense}
          setSelectedExpense={setSelectedExpense}
          onClickAddExpensebtn = {handleBackdrop}
          showBackdrop={showBackdrop}
        />
      ) : null}
      <ExpenseSummary expense={expense} className='summary'/>
      </div>
      <div className="header1">
      <Expenselist
        expense={expense}
        deleteExpense={deleteExpense}
        updateExpense={(exp) => {
           setSelectedExpense(exp);
           setShowBackdrop(true)
        }}
       
      />
      
      <ExpenseTrends expense={expense} />
      </div>
      </div>
    
  );
}

export default App;
