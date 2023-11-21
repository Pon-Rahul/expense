import React, { useState } from 'react';
import './Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router';

const Register = () => {
  const url = "https://65588f65e93ca47020a97407.mockapi.io/users"

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setFormErrors({
      ...formErrors,
      [e.target.name]: '',
    });

    if (e.target.name === 'password') {
      setFormErrors({
        ...formErrors,
        confirmPassword: validateConfirmPassword(
          formData.confirmPassword,
          e.target.value
        ),
      });
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    return '';
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (confirmPassword !== password) {
      return "Passwords don't match";
    }

    return '';
  };

 
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {...formData}
    setFormData(data)
    await axios.post(url,data)
    alert('account created successfully')
     navigate('/')
   };

  return (
    <div className="App">
      <div className="container">
      <h1>Register Account</h1>
      <form>
        <label>
          <input
          placeholder='Username'
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {formErrors.username && <p style={{ color: 'red' }}>{formErrors.username}</p>}
        </label>
        <br />
        <label> 
          <input
          placeholder='E-mail'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
        </label>
        <br />
        <label>
          <input
           placeholder='Enter Password'
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => {
              handleChange(e);
              setFormErrors({
                ...formErrors,
                password: validatePassword(e.target.value),
              });
            }}
            required
          />
          {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
        </label>
        <br />
        <label>
          
          <input
          placeholder='Confirm Password'
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => {
              handleChange(e);
              setFormErrors({
                ...formErrors,
                confirmPassword: validateConfirmPassword(
                  e.target.value,
                  formData.password
                ),
              });
            }}
            required
          />
          {formErrors.confirmPassword && (
            <p style={{ color: 'red' }}>{formErrors.confirmPassword}</p>
          )}
        </label>
        <br />
        <button type="submit" className='registerbutton' onClick={handleSubmit}>Register</button>
      </form>
    </div>
    </div>
  );
};

export default Register;
