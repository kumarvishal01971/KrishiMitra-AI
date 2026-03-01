// src/api/api.js
const BACKEND = "http://localhost:8000";
const OWM_KEY = import.meta.env?.VITE_OPENWEATHER_API_KEY || "1d8718546f43e91b90fe914c96b6881e";
const OWM_BASE = "https://api.openweathermap.org/data/2.5";

// ── Is input a 6-digit Indian PIN code? ──────────────────────
const isPinCode = (input) => /^\d{6}$/.test(input.trim());

// ── Map OWM icon codes → Icon component names ────────────────
const mapIcon = (icon = '') => {
  if (icon.startsWith('01')) return 'sun';
  if (icon.startsWith('09') || icon.startsWith('10') || icon.startsWith('11')) return 'rain';
  return 'cloud';
};

// ── Farming advice for forecast ───────────────────────────────
const forecastAdvice = (temp, rainPct) => {
  if (rainPct > 70) return 'Avoid spraying. Check field drainage.';
  if (rainPct > 40) return 'Light rain likely. Hold off irrigation.';
  if (temp > 35)    return 'Heat stress risk. Irrigate in early morning.';
  if (temp < 15)    return 'Cool day. Good for leafy vegetables.';
  return 'Good conditions for fieldwork.';
};

// ── Build forecast from OWM 5-day/3hr list ───────────────────
const buildForecast = (list = []) => {
  const seen = new Set();
  const result = [];
  for (const item of list) {
    const date = new Date(item.dt * 1000);
    const day  = date.toLocaleDateString('en-IN', { weekday: 'short' });
    const hour = date.getHours();
    if (!seen.has(day) && hour >= 11 && hour <= 14) {
      seen.add(day);
      const rain = Math.round((item.pop || 0) * 100);
      result.push({
        day,
        icon:   mapIcon(item.weather?.[0]?.icon),
        temp:   Math.round(item.main.temp),
        rain,
        advice: forecastAdvice(item.main.temp, rain),
      });
    }
    if (result.length === 4) break;
  }
  return result;
};

// ── Core OWM fetcher — handles BOTH city name and PIN code ────
const fetchOWM = async (input) => {
  const pin = isPinCode(input);

  // Use zip endpoint for PIN codes, q= for city names
  const query = pin
    ? `zip=${input.trim()},IN`
    : `q=${encodeURIComponent(input.trim())}`;

  const [curRes, fRes] = await Promise.all([
    fetch(`${OWM_BASE}/weather?${query}&appid=${OWM_KEY}&units=metric`),
    fetch(`${OWM_BASE}/forecast?${query}&appid=${OWM_KEY}&units=metric`),
  ]);

  if (!curRes.ok) {
    if (curRes.status === 404) throw new Error(
      pin
        ? `PIN code "${input}" not found. Please check the PIN or enter city name.`
        : `City "${input}" not found. Check spelling or try a nearby city.`
    );
    if (curRes.status === 401) throw new Error('Invalid API key. Please check configuration.');
    throw new Error(`Weather fetch failed (${curRes.status}). Please try again.`);
  }

  const cur    = await curRes.json();
  const fData  = await fRes.json();

  return {
    city:      `${cur.name}, ${cur.sys?.country || 'IN'}`,
    temp:      Math.round(cur.main.temp),
    feels:     Math.round(cur.main.feels_like),
    humidity:  cur.main.humidity,
    wind:      Math.round((cur.wind?.speed || 0) * 3.6), // m/s → km/h
    condition: cur.weather?.[0]?.description || 'Clear',
    icon:      mapIcon(cur.weather?.[0]?.icon),
    forecast:  buildForecast(fData.list || []),
  };
};

// ── Main export ───────────────────────────────────────────────
export const getRealWeather = async (input) => {
  // Try backend first (4s timeout), fall through to OWM if unavailable
  try {
    const res = await fetch(
      `${BACKEND}/weather?location=${encodeURIComponent(input.trim())}`,
      { signal: AbortSignal.timeout(4000) }
    );
    if (res.ok) {
      const data = await res.json();
      if (data?.temp != null) return data; // backend returned ready-to-use data
    }
  } catch {
    console.warn('Backend unavailable, using OpenWeatherMap directly.');
  }

  return fetchOWM(input);
};

// ── GPS → city name (for "Use My Location") ──────────────────
export const getWeatherByCoords = async (lat, lon) => {
  // OWM reverse geocoding
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${OWM_KEY}`
    );
    if (res.ok) {
      const json = await res.json();
      if (json?.[0]?.name) return json[0].name; // just return city name, no country
    }
  } catch { /* ignore */ }

  // Nominatim fallback
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      return addr.city || addr.town || addr.village || addr.state;
    }
  } catch { /* ignore */ }

  throw new Error('Could not detect your city. Please enter manually.');
};

// ── Other backend endpoints ───────────────────────────────────
export const predictDisease = async (file) => {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(`${BACKEND}/predict`, { method: 'POST', body: fd });
  return res.json();
};

export const sendChatMessage = async (message) => {
  const res = await fetch(`${BACKEND}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  return res.json();
};

// ── Static demo/fallback data ─────────────────────────────────
export const demoWeather = {
  city: "Pune, IN", temp: 28, feels: 31, humidity: 72, wind: 14,
  condition: "Partly Cloudy", icon: "cloud",
  forecast: [
    { day: "Mon", icon: "rain",  temp: 24, rain: 80, advice: "Delay spraying. Heavy rain expected."       },
    { day: "Tue", icon: "cloud", temp: 27, rain: 30, advice: "Good for light irrigation."                 },
    { day: "Wed", icon: "sun",   temp: 32, rain: 5,  advice: "Ideal for harvesting."                     },
    { day: "Thu", icon: "cloud", temp: 26, rain: 45, advice: "Moderate wind. Secure shade nets."          },
  ],
};

export const demoChatResponses = {
  blight:     "Late Blight is caused by Phytophthora infestans. Apply Mancozeb 75% WP @ 2g/L. Remove infected parts.",
  fertilizer: "For Rice: NPK 120-60-60 kg/ha. Split nitrogen into 3 doses.",
  weather:    "Humidity > 80% for consecutive days = high fungal disease risk. Consider prophylactic spray.",
  default:    "Contact your local KVK or call KISAN helpline: 1800-180-1551 (free).",
};

export const demoDiseaseResult = {
  disease: "Late Blight", confidence: 0.91, severity: "High",
  solution: "Apply copper-based fungicide. Remove infected leaves. Avoid overhead watering.",
};