import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 👈 Import useNavigate
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate(); // 👈 Initialize navigate
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      
      // 👇 Save the token and redirect
      localStorage.setItem('token', res.data.token);
      navigate('/admin/dashboard');

    } catch (err) {
      console.error('Login error:', err.response.data);
      localStorage.removeItem('token');
      alert('Login Failed: ' + err.response.data.msg);
    }
  };

  return (
    // ... JSX for the form remains the same
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmit}>
        <h2>Admin Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;