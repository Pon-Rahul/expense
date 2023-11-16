// src/App.js
import React, { useState } from 'react';
import './Register.css'
const Register = () => {
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

    // Clear the corresponding error when the user starts typing in a field
    setFormErrors({
      ...formErrors,
      [e.target.name]: '',
    });

    // Validate confirm password when password changes
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

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate empty fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        isValid = false;
        errors[key] = 'This field is required';
      }
    });

    // Validate password
    errors.password = validatePassword(formData.password);

    // Validate confirm password
    errors.confirmPassword = validateConfirmPassword(
      formData.confirmPassword,
      formData.password
    );

    setFormErrors(errors);

    return isValid;
  };

  const handleSubmit = async(e) => {
    const {username,email,password,confirmPassword} = formData;
    e.preventDefault();
    const options = {
      method :  'POST',
      headers : {
        'Content-Type':'aplication/json'
      },
      body : JSON.stringify({
        username,email,password,confirmPassword
      })
    }
    const res = await fetch(
      'https://expense-8ff00-default-rtdb.firebaseio.com/userdata-json',
      options
    )

    if (!validateForm() && res) {
      alert('sent')
      return;
    }
    else{
      alert('error')
    }
  };

  return (
    <div className="App">
      <div className="container">
      <h1>Register Account</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
};

export default Register;
