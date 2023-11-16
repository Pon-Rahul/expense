// src/components/Login/Login.js
import { useNavigate } from 'react-router';
import './Login.css';

const Login = () => {

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login form submitted');
  };

  return (
    <div className="Login">
      <div className="container">
          <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <label>
                <input placeholder='E-mail' type="text" name="E-mail" required />
              </label>
              <br />
              <label>
                <input placeholder='Password' type="password" name="password" required />
              </label>
              <div>
                Forget Password ?
              </div>
              <br />
              <button type="submit">Login</button>
            </form>
              <button type="button" onClick={() => navigate("/register")}>
                Register
              </button>
          </>
      </div>
    </div>
  );
};

export default Login;
