// src/api/api.js
const API = "http://localhost:8000";

export const predictDisease = async (file) => {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API}/predict`, { method: "POST", body: fd });
  return await res.json();
};

export const getWeather = async (location) => {
  const res = await fetch(`${API}/weather?location=${encodeURIComponent(location)}`);
  return await res.json();
};

export const sendChatMessage = async (message) => {
  const res = await fetch(`${API}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return await res.json();
};

// Demo data for offline mode
export const demoWeather = {
  city: "Pune, Maharashtra",
  temp: 28,
  feels: 31,
  humidity: 72,
  wind: 14,
  condition: "Partly Cloudy",
  icon: "cloud",
  forecast: [
    { day: "Tomorrow", icon: "rain", temp: 24, rain: 80, advice: "Delay pesticide spraying. Heavy rain expected." },
    { day: "Wednesday", icon: "cloud", temp: 27, rain: 30, advice: "Good day for light irrigation and field inspection." },
    { day: "Thursday", icon: "sun", temp: 32, rain: 5, advice: "Ideal for harvesting. Low humidity, sunny conditions." },
    { day: "Friday", icon: "wind", temp: 26, rain: 45, advice: "Moderate wind. Secure greenhouses and shade nets." },
  ],
};

export const demoChatResponses = {
  blight: "Late Blight is caused by Phytophthora infestans. Apply copper-based fungicide (Mancozeb 75% WP @ 2g/L). Remove infected plant parts. Maintain proper spacing for airflow.",
  fertilizer: "For neutral pH soil (6-7), apply balanced NPK fertilizer. For Rice: 120-60-60 kg/ha NPK. Split nitrogen into 3 doses: at transplanting, tillering, and panicle initiation stages.",
  weather: "Monitor humidity closely. If humidity > 80% for consecutive days, risk of fungal diseases increases significantly. Consider prophylactic fungicide spray.",
  default: "Great question! Based on agricultural best practices, I recommend consulting your local Krishi Vigyan Kendra (KVK) for localized advice. For immediate help, the KISAN Call Centre (1800-180-1551) is available free of cost.",
};

export const demoDiseaseResult = {
  error: "Backend not connected. Running in demo mode.",
  disease: "Late Blight",
  confidence: 0.91,
  solution: "Apply copper-based fungicide. Remove infected leaves. Ensure good air circulation. Avoid overhead watering. Repeat treatment every 7-10 days.",
  severity: "High"
};