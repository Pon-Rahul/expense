// src/components/Reports/Reports.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';


const Reports = ({ expenses }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const report = useSelector((state) => state.expense)
  const[generate , setGenerate] = useState(report)
  

  const handleChangeYear = (e) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };

  const handleChangeMonth = (e) => {
    setSelectedMonth(parseInt(e.target.value, 10));
  };

  const generateReport = () => {
    // Add your logic to generate the report based on selectedYear and selectedMonth
    console.log(`Generating report for ${selectedYear}-${selectedMonth}`);
  };

  return (
    <div className="Reports">
      <div className="container">
        <h1>Expense Reports</h1>
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
          {/* Add your report results here */}
        </div>
      </div>
    </div>
  );
};

export default Reports;
