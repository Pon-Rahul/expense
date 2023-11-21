import React from 'react';
import './Header.css'
import { useNavigate } from 'react-router-dom';
const Header = () => {

  const navigate = useNavigate()

  return (
    <header className="Header">
      <nav className='Nav'>
        <div>
            <span onClick={()=>navigate('/history')} >History</span>
            <span onClick={()=>navigate('/dashboard')} >Dashboard</span>
          <span onClick={()=>navigate('/add')}>Add</span>
          <span onClick={()=>navigate('/report')} >Report</span>
          <span onClick={()=>navigate('/')} >Log out</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
