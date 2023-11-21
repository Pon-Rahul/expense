import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';
import axios from 'axios';
import { updatekey } from '../Redux/Action';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const dispatch = useDispatch()

    const eMailHandler = (event) => {
      setLoginEmail(event.target.value)
  }
  const passWordHandler = (event) => {
      setLoginPassword(event.target.value)
  }
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    const url = `https://65588f65e93ca47020a97407.mockapi.io/users?email=${loginEmail}`
    const check = await axios.get(url) 
    
    if(check.data.length > 0 && check.data[0].password===loginPassword){
      localStorage.setItem('uniqueid', JSON.stringify(check.data[0].id));
      dispatch(updatekey(check.data[0].id))
      navigate('/dashboard')
    }
    else{
      alert("enter valid data")
    }
    setLoginEmail("")
    setLoginPassword("")
  };

  return (
    <div className="Login">
      <div className="container">
          <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <label>
                <input placeholder='E-mail' type="text"onChange={eMailHandler}  />
              </label>
              <br />
              <label>
                <input placeholder='Password' type="password"onChange={passWordHandler}  />
              </label>
              <div onClick={() => navigate("/forget")} className='forgetbutton'>
                Forget Password ?
              </div>
              <br />
              <button type="submit" className='loginbutton'>Login</button>
            </form>
              <button type="button"className='loginbutton' onClick={() => navigate("/register")}>
                Register
              </button>
          </>
      </div>
    </div>
  );
};

export default Login;
