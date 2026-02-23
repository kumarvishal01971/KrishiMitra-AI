// src/styles/theme.js
export const theme = {
  soil: "#2C1A0E",
  bark: "#4A2E1A",
  earth: "#7C5230",
  clay: "#A8703A",
  wheat: "#D4A843",
  leaf: "#3D7A3C",
  sprout: "#5BAD5A",
  sage: "#8FBF6F",
  sky: "#1A3A5C",
  rain: "#2E6B9E",
  mist: "#7BB3D4",
  cream: "#FFF8EE",
  parchment: "#F5E6CC",
  alert: "#E05C2C",
  success: "#3AAA5C",
};

export const severityColor = {
  High: theme.alert,
  Medium: theme.wheat,
  Low: theme.sprout,
};

export const typeColors = {
  sow: theme.sprout,
  water: theme.rain,
  fertilize: theme.wheat,
  pest: theme.alert,
  disease: "#FF6B6B",
  harvest: theme.clay,
};