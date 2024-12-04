import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const DeleteBus = () => {
  const [busId, setBusId] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBusId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.delete(`/api/admin/delete-bus/${busId}`, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    input: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    inputFocus: {
      borderColor: '#007bff',
      outline: 'none',
    },
    submitButton: {
      padding: '10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#dc3545',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
    },
    submitButtonHover: {
      backgroundColor: '#c82333',
    },
    message: {
      color: 'green',
      textAlign: 'center',
    },
    backButton: {
      display: 'block',
      marginBottom: '20px',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#6c757d',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      textAlign: 'center',
    },
    backButtonHover: {
      backgroundColor: '#5a6268',
    },
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.backButton} 
        onClick={() => navigate('/admin')}
      >
        Back to Dashboard
      </button>
      <h2 style={styles.heading}>Delete Bus</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={busId}
          onChange={handleChange}
          placeholder="Bus ID"
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = styles.input.borderColor}
        />
        <button 
          type="submit" 
          style={styles.submitButton}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.submitButton.backgroundColor}
        >
          Delete Bus
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default DeleteBus;
