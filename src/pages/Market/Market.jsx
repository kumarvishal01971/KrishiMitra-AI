// src/pages/Market/Market.jsx
import React, { useState } from 'react';
import Card from '../../components/common/Card';
import { theme } from '../../styles/theme';

const Market = () => {
  const [search, setSearch] = useState("");
  const crops = [
    { name: "Rice (Basmati)", price: 3250, change: +80, unit: "₹/Quintal", market: "Delhi" },
    { name: "Wheat", price: 2450, change: -30, unit: "₹/Quintal", market: "Ludhiana" },
    { name: "Tomato", price: 1800, change: +250, unit: "₹/Quintal", market: "Nashik" },
    { name: "Onion", price: 1200, change: -100, unit: "₹/Quintal", market: "Pune" },
    { name: "Potato", price: 900, change: +50, unit: "₹/Quintal", market: "Agra" },
    { name: "Cotton", price: 6800, change: +120, unit: "₹/Quintal", market: "Nagpur" },
    { name: "Soybean", price: 4500, change: -80, unit: "₹/Quintal", market: "Indore" },
    { name: "Maize", price: 1950, change: +30, unit: "₹/Quintal", market: "Bihar" },
  ].filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h2 style={{ color: theme.wheat, fontFamily: "'Playfair Display', serif", fontSize: 28, marginBottom: 8 }}>
        Mandi Prices
      </h2>
      <p style={{ color: theme.mist, marginBottom: 24, opacity: 0.8, fontSize: 14 }}>
        Live market rates updated daily from major mandis across India
      </p>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search crop..."
        style={{
          width: "100%",
          background: "rgba(255,248,238,0.06)",
          border: `1px solid ${theme.earth}`,
          borderRadius: 12,
          padding: "12px 16px",
          color: theme.cream,
          fontFamily: "inherit",
          fontSize: 14,
          outline: "none",
          marginBottom: 20,
          boxSizing: "border-box",
        }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {crops.map((c, i) => (
          <Card key={i} style={{ cursor: "default" }}>
            <p style={{ color: theme.mist, fontSize: 12, marginBottom: 4 }}>{c.name}</p>
            <p style={{ color: theme.cream, fontSize: 24, fontWeight: 700 }}>{c.price.toLocaleString()}</p>
            <p style={{ color: theme.mist, fontSize: 11, marginBottom: 8 }}>{c.unit} • {c.market}</p>
            <span style={{
              color: c.change > 0 ? theme.success : theme.alert,
              background: c.change > 0 ? `${theme.success}22` : `${theme.alert}22`,
              padding: "2px 8px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 700,
            }}>
              {c.change > 0 ? "▲" : "▼"} {Math.abs(c.change)}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Market;