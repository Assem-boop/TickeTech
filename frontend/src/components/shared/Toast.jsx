import React, { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const toastStyles = {
    ...styles.toast,
    ...(type === 'error' ? styles.error : styles.success)
  };

  return (
    <div style={styles.container}>
      <div style={toastStyles}>
        <span style={styles.message}>{message}</span>
        <button 
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          style={styles.closeButton}
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Toast Container Component for managing multiple toasts
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div style={styles.containerWrapper}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

const styles = {
  containerWrapper: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
  },
  container: {
    marginBottom: '10px',
  },
  toast: {
    minWidth: '300px',
    padding: '12px 24px',
    borderRadius: '4px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    animation: 'slideIn 0.3s ease-out',
  },
  success: {
    backgroundColor: '#1a1a2e',
    border: '1px solid #00e676',
    color: '#00e676',
  },
  error: {
    backgroundColor: '#1a1a2e',
    border: '1px solid #ff4444',
    color: '#ff4444',
  },
  message: {
    fontSize: '14px',
    marginRight: '10px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'inherit',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '0 5px',
  },
  '@keyframes slideIn': {
    from: {
      transform: 'translateX(100%)',
      opacity: 0,
    },
    to: {
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
};

export default Toast; 