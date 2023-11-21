// src/components/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './Dashboard.css';
import Header from '../Header/Header';

const Dashboard = () => {

  const infohistory = useSelector((state) => state.unique)
  const [expenses, setExpenses] = useState();
  const [totalExpense, setTotalExpense] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const url = `https://65588f65e93ca47020a97407.mockapi.io/expense?uniqueid=${infohistory}`
  const [data , setData] = useState([
    ["Category", "Expense"],
    ["Food", 0],
    ["Travel", 0],
    ["Entertainment", 0],
  ]);
  async function fetchData() {
    const list = await axios.get(url)
    setExpenses(list.data)
    let e = 0;
    let f = 0;
    let t = 0;
    for (let i = 0; i < list.data.length; i++) {
      if (list.data[i].category === 'entertainment') {
        e += parseInt(list.data[i].amount)
      }
      if (list.data[i].category === 'food') {
        f += parseInt(list.data[i].amount)
      }
      if (list.data[i].category === 'travel') {
        t += parseInt(list.data[i].amount)
      }
    }
    const newData = [...data];
    const foodIndex = newData.findIndex((entry) => entry[0] === "Food");
    const travelIndex = newData.findIndex((entry) => entry[0] === "Travel");
    const entertainmentIndex = newData.findIndex((entry) => entry[0] === "Entertainment");
    newData[foodIndex] = ["Food", f];
    newData[travelIndex] = ["Travel",t];
    newData[entertainmentIndex] = ["Entertainment",e]
    setData(newData);
    let total = 0;
    for (let i = 0; i < list.data.length; i++) {
      total += parseInt(list.data[i].amount)
    }
    setTotalExpense(total)
    let arr = []

    for (let i = list.data.length - 1; i > list.data.length - 5; i--) {
      if(list.data[i])
      arr.push(list.data[i])
    }
    setRecentTransactions(arr)
    
  }

  useEffect(() => {
   
    fetchData();
  }, []);
 
  const options = {
    title: "Expense",
  };
  const navigate = useNavigate();

  const editHandler = (o, i) => {
    navigate(`/edit/${o.id}`)
  }
  
  const deleteHandler = async(o,i) =>{
    await axios.delete(`https://65588f65e93ca47020a97407.mockapi.io/expense/${o.id}`)
    fetchData();

  }
  
  return (
    <>
      <Header/>
      <span>
    <span className="Dashboard">
      <div className="containers">
        <h1>Expense Dashboard</h1>
        <div className="add-expense-button">
          <button onClick={()=>navigate('/add')}>Add New Expense</button>
        </div>
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"200px"}
          />
        <div className="summary">
          <h3>Total Expense for Current Month: ${totalExpense}</h3>
        </div>
        <div className="recent-transactions">
          <h2>Recent Transactions</h2>
          <ul>
            {recentTransactions && recentTransactions.map((transaction, i) => (
              <li key={transaction?.id}>
                <strong>{transaction?.description}</strong> - ${transaction?.amount} ({transaction?.category})
                <button className='edit' onClick={() => editHandler(transaction, i)}>Edit</button>
                <button className='delete' onClick={() => deleteHandler(transaction, i)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
      <span>
          
        </span>
    </span>
    </span>
    </>
    
  );
};

export default Dashboard;
