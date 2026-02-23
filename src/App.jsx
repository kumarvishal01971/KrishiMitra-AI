// src/App.jsx
import React, { useState } from 'react';
//import Header from './components/layout/Header';
//import Footer from './components/layout/Footer';
//import DiseaseDetection from './pages/Disease/DiseaseDetection';
//import Weather from './pages/Weather/Weather';
//import Fertilizer from './pages/Fertilizer/Fertilizer.jsx';
//import Market from './pages/Market/Market';

// import CropCalendar from './pages/Calendar/CropCalendar';
// import Videos from './pages/Videos/Videos';
// import Community from './pages/Community/Community';
// import Schemes from './pages/Schemes/Schemes';
// import Chatbot from './pages/Chatbot/Chatbot';
import { theme } from './styles/theme';
import './styles/global.css';
import Fertilizer from './pages/Fertilizer/Fertilizer';
import DiseaseDetection from './pages/Disease/DiseaseDetection';
import Weather from './pages/Weather/Weather';
import Market from './pages/Market/Market';
import CropCalendar from './pages/Calender/CropCalendar';
import Videos from './pages/Videos/Videos';
import Community from './pages/Community/Community';
import Schemes from './pages/Schemes/Schemes';
import Chatbot from './pages/Chatbot/Chatbot';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const App = () => {
  const [active, setActive] = useState("disease");

  const pages = {
    disease: <DiseaseDetection />,
    weather: <Weather />,
    fertilizer: <Fertilizer />,
    market: <Market />,
    calendar: <CropCalendar />,
    videos: <Videos />,
    community: <Community />,
    schemes: <Schemes />,
    chatbot: <Chatbot />,
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 20% 0%, ${theme.bark}66 0%, transparent 50%),
                   radial-gradient(ellipse at 80% 100%, ${theme.sky}44 0%, transparent 50%),
                   ${theme.soil}`,
      fontFamily: "'DM Sans', sans-serif",
      color: theme.cream,
    }}>
      <Header active={active} setActive={setActive} />
      
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        {pages[active]}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;