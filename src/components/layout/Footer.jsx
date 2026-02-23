// src/components/layout/Footer.jsx
import React from 'react';
import { theme } from '../../styles/theme';

const Footer = () => (
  <footer style={{
    textAlign: "center",
    padding: "20px 0",
    borderTop: `1px solid ${theme.earth}33`,
    color: theme.mist,
    opacity: 0.5,
    fontSize: 12
  }}>
    AgroSense AI Farm Intelligence • Python FastAPI + React • Keras Disease Model
  </footer>
);

export default Footer;