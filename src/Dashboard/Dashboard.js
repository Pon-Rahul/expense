// src/components/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import './Dashboard.css';

const Dashboard = ({ expenses, onAddExpense, onDeleteExpense, onEditExpense }) => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const expenseinfo = useSelector((state) => state.expense)
  const[expensedata , setexpensedata] = useState(expenseinfo)


  // useEffect(() => {
  //   // Calculate total expense for the current month
  //   const currentDate = new Date();
  //   const currentMonth = currentDate.getMonth() + 1;
  //   const currentYear = currentDate.getFullYear();

  //   const filteredExpenses = expensedata.filter(
  //     (expense) =>
  //       new Date(expense.date).getMonth() + 1 === currentMonth &&
  //       new Date(expense.date).getFullYear() === currentYear
  //   );

  //   const total = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);
  //   setTotalExpense(total);

  //   // Get recent transactions (for example, the last 5)
  //   const sortedExpenses = [...filteredExpenses].sort((a, b) => new Date(b.date) - new Date(a.date));
  //   const recent = sortedExpenses.slice(0, 5);
  //   setRecentTransactions(recent);
  // }, [expenses]);

  return (
    <div className="Dashboard">
      <div className="containers">
        <h1>Expense Dashboard</h1>
        <div className="summary">
          <p>Total Expense for Current Month: ${totalExpense}</p>
        </div>
        <div className="recent-transactions">
          <h2>Recent Transactions</h2>
          <ul>
            {recentTransactions.map((transaction) => (
              <li key={transaction.id}>
                <strong>{transaction.description}</strong> - ${transaction.amount} ({transaction.category})
                <button onClick={() => onEditExpense(transaction.id)}>Edit</button>
                <button onClick={() => onDeleteExpense(transaction.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="add-expense-button">
          <button onClick={onAddExpense}>Add New Expense</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
