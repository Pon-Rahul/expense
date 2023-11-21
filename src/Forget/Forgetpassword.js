import React, { useState } from 'react';
import './Forgetpassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    const url = 'https://65588f65e93ca47020a97407.mockapi.io/users'
    e.preventDefault();
    const resp = await axios.get(url)
    for(let i = 0 ; i < resp.data.length ; i++){
    if(resp.data[i].email === email){
      console.log(resp.data[i].email)
      navigate(`/change/${i}`)
    }
  }
  
  };

  return (
    <div className="ForgetPassword">
      <div className="container">
        <h1>Forget Password</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
