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
    कृषि Mitra AI Farm Manager • Python FastAPI + React • Keras Disease Model @2026
  </footer>
);

export default Footer;