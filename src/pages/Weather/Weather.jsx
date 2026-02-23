// src/pages/Weather/Weather.jsx
import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Btn from '../../components/common/Button';
import Icon from '../../components/common/Icon';
import { theme } from '../../styles/theme';
import { getWeather, demoWeather } from '../../api/api';

const Weather = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const data = await getWeather(location);
      setWeather(data);
    } catch {
      setWeather({ ...demoWeather, city: location || demoWeather.city });
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ color: theme.wheat, fontFamily: "'Playfair Display', serif", fontSize: 28, marginBottom: 8 }}>
        Weather Alerts
      </h2>
      <p style={{ color: theme.mist, marginBottom: 24, opacity: 0.8, fontSize: 14 }}>
        Real-time weather with farming-specific action advice
      </p>

      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          placeholder="Enter city or PIN code..."
          style={{
            flex: 1, background: "rgba(255,248,238,0.06)", border: `1px solid ${theme.earth}`,
            borderRadius: 12, padding: "12px 16px", color: theme.cream, fontFamily: "inherit", fontSize: 14,
            outline: "none",
          }}
        />
        <Btn onClick={fetchWeather} loading={loading} icon="cloud">Get Weather</Btn>
      </div>

      {(weather || demoWeather) && (() => {
        const w = weather || demoWeather;
        return (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20, marginBottom: 20 }}>
              <Card style={{ background: `linear-gradient(135deg, ${theme.sky}66, ${theme.rain}33)` }}>
                <p style={{ color: theme.mist, fontSize: 12, marginBottom: 4 }}>{w.city}</p>
                <div style={{ fontSize: 56, fontWeight: 900, color: theme.cream, lineHeight: 1 }}>{w.temp}°</div>
                <p style={{ color: theme.mist, marginTop: 4 }}>{w.condition}</p>
                <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
                  <div><Icon name="thermometer" size={14} color={theme.mist} /><span style={{ color: theme.mist, fontSize: 12, marginLeft: 4 }}>Feels {w.feels}°</span></div>
                  <div><Icon name="rain" size={14} color={theme.mist} /><span style={{ color: theme.mist, fontSize: 12, marginLeft: 4 }}>{w.humidity}%</span></div>
                  <div><Icon name="wind" size={14} color={theme.mist} /><span style={{ color: theme.mist, fontSize: 12, marginLeft: 4 }}>{w.wind} km/h</span></div>
                </div>
              </Card>

              <Card>
                <p style={{ color: theme.wheat, fontWeight: 700, marginBottom: 12, fontSize: 12, letterSpacing: 1 }}>
                  TODAY'S FARMING ALERT
                </p>
                <div style={{ background: `${theme.leaf}22`, borderRadius: 12, padding: 16, borderLeft: `3px solid ${theme.sprout}` }}>
                  <p style={{ color: theme.cream, lineHeight: 1.7 }}>
                    {w.temp > 30
                      ? "High temperature alert: Increase irrigation frequency. Consider shade netting for sensitive crops."
                      : w.humidity > 70
                        ? "High humidity: Risk of fungal diseases. Monitor crops closely and ensure air circulation."
                        : "Conditions are moderate. Good day for field operations and fertilizer application."}
                  </p>
                </div>
              </Card>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {w.forecast.map((f, i) => (
                <Card key={i} style={{ textAlign: "center" }}>
                  <p style={{ color: theme.mist, fontSize: 12, marginBottom: 8 }}>{f.day}</p>
                  <Icon name={f.icon} size={28} color={f.icon === "sun" ? theme.wheat : f.icon === "rain" ? theme.rain : theme.mist} />
                  <p style={{ color: theme.cream, fontSize: 20, fontWeight: 700, margin: "8px 0" }}>{f.temp}°</p>
                  <p style={{ color: theme.rain, fontSize: 11, marginBottom: 8 }}>🌧 {f.rain}%</p>
                  <p style={{ color: theme.mist, fontSize: 11, lineHeight: 1.5 }}>{f.advice}</p>
                </Card>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default Weather;