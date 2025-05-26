import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../../api/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await authAPI.forgotPassword(email);
      setSuccess('Password reset instructions have been sent to your email.');
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Forgot Password</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        
        <div style={styles.inputGroup}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <button 
          type="submit" 
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <div style={styles.links}>
          <Link to="/login" style={styles.link}>
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    padding: '20px',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    backgroundColor: '#1a1a2e',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#00e676',
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2rem',
    textShadow: '0 0 10px rgba(0, 230, 118, 0.5)',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #302b63',
    borderRadius: '5px',
    backgroundColor: '#24243e',
    color: '#fff',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#00e676',
    color: '#1a1a2e',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  error: {
    color: '#ff4444',
    marginBottom: '1rem',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    borderRadius: '5px',
  },
  success: {
    color: '#00e676',
    marginBottom: '1rem',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    borderRadius: '5px',
  },
  links: {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  link: {
    color: '#00e676',
    textDecoration: 'none',
    fontSize: '0.9rem',
  },
};

export default ForgotPassword; 