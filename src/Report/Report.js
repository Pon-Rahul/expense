// src/components/Reports/Reports.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Chart from 'react-google-charts';
import jsPDF from 'jspdf'
import Header from '../Header/Header';


const Reports = ({ expenses }) => {
  const data = [
    ["Month", "Expense"],
    ["Jan", 1000],
    ["Feb", 1170],
    ["Mar", 660],
    ["Apr", 103],
    ["May", 1200],
    ["Jun", 50],
    ["Jul", 500],
    ["Aug", 850],
    ["Sep", 200],
    ["Nov", 30],
    ["Dec", 200]
  ];
  const options = {
    chart: {
      title: "Total Expense",
    },
  };
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [food, setFood] = useState(0)
  const [travel, setTravel] = useState(0)
  const [entertainment, setEntertainment] = useState(0)
  const [total, setTotal] = useState(0)
  const infodata = useSelector((state) => state.unique)
  const url = `https://65588f65e93ca47020a97407.mockapi.io/expense?uniqueid=${infodata}`

  useEffect(() => {
    async function fetchData() {
      const list = await axios.get(url)
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
      setEntertainment(e)
      setFood(f)
      setTravel(t)
    }
    fetchData();
  }, []);

  const handleChangeYear = (e) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };

  const handleChangeMonth = (e) => {
    setSelectedMonth(parseInt(e.target.value, 10));
  };

  const generateReport = async () => {
    const list = await axios.get(url)
    let total = 0;
    let e = 0;
    let t = 0;
    let f = 0;
    for (let i = 0; i < list.data.length; i++) {
      var dateString = list.data[i].date
      var dateObject = new Date(dateString);
      var month = dateObject.getMonth() + 1;
      var year = dateObject.getFullYear();
      if (month === selectedMonth && year === selectedYear) {
        total += parseInt(list.data[i].amount)
      }
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
    setTotal(total)
    const pdf = new jsPDF();

    pdf.text(`Month : ${selectedMonth} Year : ${selectedYear} \n Entertainment : ${e}\n Food : ${f} \n Travel : ${t} \n total : ${total}`, 10, 10);


    pdf.save('document.pdf');
  };

  return (
    <div>
      <Header />
      <div>
        <div >
          <div className="Reports">
            <div className="containers">
              <h1>Expense Reports</h1>
              <span className='container'>Food:{food}</span>
              <span className='container'>Travel:{travel}</span>
              <span className='container'>Entertainment:{entertainment}</span>
              <div className="controls">
                <label>
                  Year:
                  <input type="number" value={selectedYear} onChange={handleChangeYear} />
                </label>
                <label>
                  Month:
                  <input type="number" value={selectedMonth} onChange={handleChangeMonth} />
                </label>
                <button onClick={generateReport}>Generate Report</button>
              </div>
              <div className="report-results">
               <h2> Total expense on {selectedMonth}th month is : ${total}</h2>
              </div>
              <Chart
                chartType="Bar"
                width="100%"
                height="300px"
                data={data}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
