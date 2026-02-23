// src/components/layout/Header.jsx
import React from 'react';
import { theme } from '../../styles/theme';
import Icon from '../common/Icon';
import { navItems } from '../navigation/NavItems';

const Header = ({ active, setActive }) => {
  return (
    <header style={{
      background: `${theme.soil}cc`,
      backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${theme.earth}44`,
      padding: "0 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 64,
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: `linear-gradient(135deg, ${theme.leaf}, ${theme.wheat})`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="leaf" size={20} color={theme.soil} />
        </div>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, color: theme.cream, lineHeight: 1 }}>
            AgroSense
          </div>
          <div style={{ fontSize: 10, color: theme.sage, letterSpacing: 2, textTransform: "uppercase" }}>
            AI Farm Intelligence
          </div>
        </div>
      </div>

      <nav style={{ display: "flex", gap: 4 }}>
        {navItems.map(n => (
          <button
            key={n.id}
            onClick={() => setActive(n.id)}
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "6px 12px",
              borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12,
              background: active === n.id ? `${theme.leaf}33` : "transparent",
              color: active === n.id ? theme.sprout : theme.mist,
              fontWeight: active === n.id ? 600 : 400,
              transition: "all 0.2s",
            }}
          >
            <Icon name={n.icon} size={14} />
            <span style={{ display: window.innerWidth > 1200 ? "inline" : "none" }}>{n.label}</span>
          </button>
        ))}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: theme.success, animation: "pulse 2s infinite" }} />
        <span style={{ color: theme.sage, fontSize: 12 }}>AI Online</span>
      </div>
    </header>
  );
};

export default Header;