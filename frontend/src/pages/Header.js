/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import '../styles/header.css';
import axios from 'axios';

const Header = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [oscillate, oscillator] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await axios.get('http://localhost:5000/user/auth-status', { withCredentials: true });
      setIsAuthenticated(response.data.isAuthenticated);
      setUsername(response.data.username)
    };

    checkAuthStatus();
  }, []);

  const loginWindow = () => {
    window.open("http://localhost:3000/login", "_self");
  };

  const homeWindow = () => {
    window.open("http://localhost:3000/", "_self");
  };

  const logout = async () => {
    await axios.post('http://localhost:5000/user/logout', {}, { withCredentials: true });
    window.open("http://localhost:3000/", "_self");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        oscillator((oscillate) => !oscillate);
        setVisible(true);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className='navbar navbar-expand-lg p-0 navbar-dark'>
      <div className='container-fluid'>
        <div className='navbar-title d-flex align-items-center'>
          <img src='/images/FinSights.png' alt='finsights.png' width={'30px'} height={'30px'} onClick={homeWindow} style={{ cursor: 'pointer' }} />
          <p id="company-name" className='mb-0 ms-2'>FinSights Corp.</p>
        </div>

        <button
          className='navbar-toggler'
          type='button'
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-controls='navbarNav'
          aria-expanded={!isCollapsed}
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id='navbarNav'>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            
            {!isAuthenticated ? (
              <>
                <li className='nav-item'>
                  <a id='login-button' href='#' className='nav-link' onClick={loginWindow}>
                    <span className={`animated-text ${visible ? 'visible' : ''}`}>
                      {oscillate ? 'Login' : 'Register'}
                    </span>
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item d-flex align-items-center'>
                  <p className='h4 text-center text-secondary m-0'>Welcome, {username}.</p>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/'>Home</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/dashboard'>Dashboard</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/history'>History</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#' onClick={logout}>Logout</a>
                </li>
              </>
            )}
            <li className='nav-item'>
              <a className='nav-link' href='/about'>About</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
