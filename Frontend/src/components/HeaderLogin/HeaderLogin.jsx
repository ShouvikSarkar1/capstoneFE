import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const HeaderLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailId: email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      //  Store user session
      localStorage.setItem('user', JSON.stringify(result.user));

      //  Redirect to dashboard after login
      navigate('/dash');

    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-input">
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          id="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn">Login</button>
        <NavLink to='/signup'>
          <button type="button" className="btn">Sign-Up</button>
        </NavLink>
      </form>
    </div>
  );
};

export default HeaderLogin;