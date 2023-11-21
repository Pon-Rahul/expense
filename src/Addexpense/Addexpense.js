import React, { useState } from 'react';
import {  useSelector} from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Header from '../Header/Header';


const AddExpense = () => {
  const uniquekey = useSelector((state) => state.unique)
  const navigate = useNavigate()
  const [expense, setExpense] = useState({
    description: '',
    amount: '',
    date: '',
    category: 'food',
    uniqueid:uniquekey
  });
  
  const handleChange = (e) => {
 
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async(e) => {
    
    const url ="https://65588f65e93ca47020a97407.mockapi.io/expense"
    e.preventDefault();
    const expensedata = {...expense}
    setExpense(expensedata)
    await axios.post(url,expensedata)
    alert('Expense added')
    navigate('/dashboard')
  };
  
  return (
    <div>
      <Header />
    <div className="AddExpense">
      <div className="container">
        <h1>Add Expense</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="description"
              value={expense.description}
              onChange={handleChange}
              placeholder="Expense name"
              required
            />
          </label>
          <br />
          <label>
            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
            />
          </label>
          <br />
          <label>
            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
              placeholder="Select date"
              required
            />
          </label>
          <br />
          <label>
            <select name="category" value={expense.category} onChange={handleChange}>

              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </label>
          <br />
          <button type="submit" className='addbutton'>Add Expense</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddExpense;
