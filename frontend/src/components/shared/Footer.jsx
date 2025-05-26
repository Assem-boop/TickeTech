import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <div style={styles.section}>
          <h3 style={styles.title}>TickeTech</h3>
          <p style={styles.description}>
            Your one-stop platform for event ticketing and management.
          </p>
        </div>

        <div style={styles.section}>
          <h4 style={styles.subtitle}>Quick Links</h4>
          <nav style={styles.nav}>
            <Link to="/events" style={styles.link}>All Events</Link>
            <Link to="/about" style={styles.link}>About Us</Link>
            <Link to="/contact" style={styles.link}>Contact</Link>
          </nav>
        </div>

        <div style={styles.section}>
          <h4 style={styles.subtitle}>Contact Info</h4>
          <div style={styles.contactInfo}>
            <p>Email: support@ticketech.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
      </div>

      <div style={styles.bottom}>
        <p style={styles.copyright}>
          © {new Date().getFullYear()} TickeTech. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1a1a2e',
    color: '#fff',
    padding: '3rem 0 1rem',
    marginTop: 'auto',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  section: {
    marginBottom: '2rem',
  },
  title: {
    color: '#00e676',
    fontSize: '1.5rem',
    marginBottom: '1rem',
    textShadow: '0 0 10px rgba(0, 230, 118, 0.5)',
  },
  subtitle: {
    color: '#00e676',
    fontSize: '1.2rem',
    marginBottom: '1rem',
  },
  description: {
    color: '#fff',
    opacity: 0.8,
    lineHeight: '1.6',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    opacity: 0.8,
    transition: 'opacity 0.3s ease',
    ':hover': {
      opacity: 1,
    },
  },
  contactInfo: {
    color: '#fff',
    opacity: 0.8,
    '& p': {
      marginBottom: '0.5rem',
    },
  },
  bottom: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    marginTop: '2rem',
    paddingTop: '1rem',
    textAlign: 'center',
  },
  copyright: {
    color: '#fff',
    opacity: 0.6,
    fontSize: '0.9rem',
  },
};

export default Footer; 