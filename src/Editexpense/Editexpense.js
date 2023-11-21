import React, { useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const EditExpense = () => {
   const [editdata , seteditdata] = useState({})
  const {index} = useParams();
  const editinfo = useSelector((state) => state.expense)
  const [editexpense, seteditexpense] = useState(editinfo)
  const url = `https://65588f65e93ca47020a97407.mockapi.io/expense/${index}`

  useEffect(() => {
    async function editData() {
      const list = await axios.get(url)
    setExpense(list.data)
    }
    editData();
  }, []);

  const [expense, setExpense] = useState({
    description: '',
    amount: '',
    date: '',
    category: '', 
  });
  
const navigate = useNavigate()
  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
    seteditexpense({
      ...editexpense,
      [e.target.name]:e.target.value,
    })
  };

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const url =`https://65588f65e93ca47020a97407.mockapi.io/expense/${expense.id}`
    await axios.put(url,expense)
    navigate(-1)
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
