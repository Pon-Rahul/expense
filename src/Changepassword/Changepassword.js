import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import './Changepassword.css';
import axios from 'axios';

const ChangePassword = () => {
  const{index} = useParams()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validatePassword(password, newConfirmPassword);
  };

  const validatePassword = (newPassword, newConfirmPassword) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const isValid = passwordRegex.test(newPassword);

    const doPasswordsMatch = newPassword === newConfirmPassword;

    setIsPasswordValid(isValid && doPasswordsMatch);
  };
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const url = 'https://65588f65e93ca47020a97407.mockapi.io/users'
     const pass = await axios.get(url)
    if (isPasswordValid) {
      await axios.put(url+"/"+pass.data[index].id , {password:confirmPassword})
      console.log('Change Password form submitted:', password);
      navigate('/')
    } else {
      alert('Passwords do not match or the password is invalid. Please try again.');
    }
  };

  return (
    <div className="ChangePassword">
      <div className="container">
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
          <label>
            New Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your new password"
              required
            />
          </label>
          <br />
          {!isPasswordValid && (
            <p className="error-message">
              Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a
              number, and a special character.
            </p>
          )}
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm your new password"
              required
            />
          </label>
          <br />
          <button type="submit" disabled={!isPasswordValid}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
