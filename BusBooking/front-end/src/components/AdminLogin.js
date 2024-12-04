import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminLogin = ({ onAdminLogin }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Reset error message
    try {
      const response = await api.post('/api/auth/login', form);
      if (response.data.role === 'admin') {
        localStorage.setItem('token', response.data.token);
        onAdminLogin(response.data.role); // Pass the role to the onAdminLogin function
        navigate('/admin');
      } else {
        setError('You are not authorized as an admin.');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'An error occurred on the server.');
      } else if (error.request) {
        setError('No response received from the server.');
      } else {
        setError('An error occurred while setting up the request.');
      }
      console.error('Error:', error);
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
      textAlign: 'center',
    },
    heading: {
      color: '#333',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
      marginBottom: '10px',
    },
    submitButton: {
      width: '100%',
      padding: '10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#007bff',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
    },
    submitButtonHover: {
      backgroundColor: '#0056b3',
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={styles.input}
        />
        <button 
          type="submit" 
          style={styles.submitButton}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.submitButton.backgroundColor}
        >
          Login
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
