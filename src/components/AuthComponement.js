// src/components/LoginComponent.js
import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import '../styleLogin.css'; // Import your CSS file here

function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    AuthService.login(username, password).then(
      response => {
        setMessage('Login successful!');
        console.log(response);
      },
      error => {
        setMessage('Login failed!');
        console.log(error);
      }
    );
  };

  return (
  <div className="bringa">

  <div className="loginBox">

      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        
        <div className="inputBox">
          <span className="icon"><i className="fa-solid fa-user"></i></span>
          <input
            type="text"
            required
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            name="nom"
          />
        </div>
        <div className="inputBox">
          <span className="icon"><i className="fa-solid fa-lock"></i></span>
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            name="password"
          />
        </div>
        <div className="registerLink">
          <p>Login By face-recognition?<a href="        navigate('/face');"> Login</a></p>
        </div>
        <button type="submit">Login</button>
        <div className="registerLink">
          <p>Don't have an account?<a href="register.html"> Register</a></p>
        </div>
        <p>{message}</p>
      </form>
      </div>
    </div>
  );
}

export default LoginComponent;
