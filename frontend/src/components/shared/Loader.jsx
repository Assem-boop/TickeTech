import React from 'react';

const Loader = ({ size = 40, color = '#00e676' }) => {
  return (
    <div style={styles.container}>
      <div 
        style={{
          ...styles.spinner,
          width: `${size}px`,
          height: `${size}px`,
          borderColor: `${color}40`,
          borderTopColor: color,
          boxShadow: `0 0 10px ${color}40`
        }}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  spinner: {
    border: '3px solid',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
};

// Add the keyframe animation to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Loader; 