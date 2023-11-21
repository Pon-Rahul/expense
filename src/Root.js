import React from "react";
import Register from "./Register/Register";
import { Route,Routes } from "react-router-dom";
import Login from "./Login/Login";
import AddExpense from "./Addexpense/Addexpense";
import History from "./History/History";
import EditExpense from "./Editexpense/Editexpense";
import Reports from "./Report/Report";
import Dashboard from "./Dashboard/Dashboard";
import ForgetPassword from "./Forget/Forgetpassword";
import ChangePassword from "./Changepassword/Changepassword";
const Root = () =>{
    return(
        <Routes>
        <Route path="register" element={<Register />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="add" element={<AddExpense />}></Route>
        <Route path="edit/:index" element={<EditExpense />}></Route>
        <Route path="history" element={<History />}></Route>
        <Route path="report" element={<Reports />}></Route> 
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="forget" element={<ForgetPassword />}></Route>
        <Route path="change/:index" element={<ChangePassword />}></Route>
        </Routes>
    )
}

export default Root;