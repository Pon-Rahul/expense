import React, { useState } from 'react';

const EditExpense = () => {


  const [expense, setExpense] = useState({
    description: '',
    amount: '',
    date: '',
    category: 'Category', 
  });

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  //const expenseinfo = useSelector((state) => state.expense)
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
  return (
    <div className="AddExpense">
      <div className="container">
        <h1>Edit Expense</h1>
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
            <select name="select" value={expense.category} onChange={handleChange}>

              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </label>
          <br />
          <button type="submit">Edit Expense</button>
        </form>
      </div>
    </div>
  );
};

export default EditExpense;
