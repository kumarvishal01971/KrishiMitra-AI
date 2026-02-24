// src/components/layout/Header.jsx
import React, { useState } from 'react';
import Icon from '../common/Icon';
import { navItems } from '../navigation/NavItems';
import './header.css';

const Header = ({ active, setActive }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('EN');

  const handleNavClick = (id) => {
    setActive(id);
    setMobileMenuOpen(false);
  };

  const toggleLang = () => setLang(l => l === 'EN' ? 'HI' : 'EN');

  return (
    <header className="header-container">
      <div className="header-content">

        {/* ── Logo ── */}
        <div className="logo-section">
          <div className="logo-icon">
            <Icon name="leaf" size={20} color="#86efac" />
          </div>
          <div className="logo-text">
            <div className="logo-title">कृषि Mitra</div>
            <div className="logo-subtitle">AI Farm Manager</div>
          </div>
        </div>

        {/* thin divider */}
        <div className="logo-divider" />

        {/* ── Center Nav ── */}
        <nav className="nav-section">
          {navItems.map((n) => (
            <button
              key={n.id}
              className={`nav-link ${active === n.id ? 'active' : ''}`}
              onClick={() => handleNavClick(n.id)}
              title={n.label}
            >
              <Icon name={n.icon} size={15} color="currentColor" />
              <span>{n.label}</span>
            </button>
          ))}
        </nav>

        {/* ── Right Controls ── */}
        <div className="right-section">

          {/* Language Toggle */}
          <button className="lang-selector" onClick={toggleLang} title="Toggle language">
            <Icon name="globe" size={13} color="currentColor" />
            <span>{lang === 'EN' ? 'English' : 'हिंदी'}</span>
            <Icon name="chevron-down" size={11} color="currentColor" />
          </button>

          {/* Voice */}
          <button className="voice-btn">
            <Icon name="mic" size={14} color="currentColor" />
            <span>Voice</span>
          </button>

          {/* Login */}
          <button className="login-btn">
            <Icon name="user" size={14} color="currentColor" />
            <span>Login / Register</span>
          </button>

          {/* AI status */}
          <div className="ai-status">
            <div className="status-dot" />
            <span className="status-text">Online</span>
          </div>

        </div>

        {/* ── Hamburger ── */}
        <button
          className={`hamburger-menu ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="hamburger-bar" />
          <div className="hamburger-bar" />
          <div className="hamburger-bar" />
        </button>

      </div>

      {/* ── Mobile Nav ── */}
      <div className={`mobile-nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
        {navItems.map((n) => (
          <button
            key={n.id}
            className={`mobile-nav-link ${active === n.id ? 'active' : ''}`}
            onClick={() => handleNavClick(n.id)}
          >
            <Icon name={n.icon} size={17} color="currentColor" />
            <span>{n.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;