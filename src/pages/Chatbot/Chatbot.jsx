// src/pages/Chatbot/Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import Card from '../../components/common/Card';
import Btn from '../../components/common/Button';
import { theme } from '../../styles/theme';
import { sendChatMessage, demoChatResponses } from '../../api/api';

const Chatbot = () => {
  const [msgs, setMsgs] = useState([
    { role: "bot", text: "Namaste! 🌱 I'm AgroBot, your AI farming assistant. Ask me about crop diseases, fertilizers, weather interpretation, government schemes, or any farming question!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = async () => {
    if (!input.trim()) return;
    const q = input;
    setInput("");
    setMsgs(m => [...m, { role: "user", text: q }]);
    setLoading(true);

    try {
      const data = await sendChatMessage(q);
      setMsgs(m => [...m, { role: "bot", text: data.response }]);
    } catch {
      const lower = q.toLowerCase();
      const reply = lower.includes("blight") ? demoChatResponses.blight
        : lower.includes("fertilizer") || lower.includes("npk") ? demoChatResponses.fertilizer
          : lower.includes("weather") || lower.includes("rain") ? demoChatResponses.weather
            : demoChatResponses.default;
      setMsgs(m => [...m, { role: "bot", text: reply }]);
    }
    setLoading(false);
  };

  const quickQ = ["What causes Yellow Rust?", "Best time to apply urea?", "How to treat aphid attack?", "Organic fertilizer options?"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 200px)" }}>
      <h2 style={{ color: theme.wheat, fontFamily: "'Playfair Display', serif", fontSize: 28, marginBottom: 4 }}>
        AgroBot AI Chat
      </h2>
      <p style={{ color: theme.mist, marginBottom: 16, opacity: 0.8, fontSize: 14 }}>
        Farming expert powered by AI — restricted to agricultural topics
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {quickQ.map((q, i) => (
          <button
            key={i}
            onClick={() => { setInput(q); }}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: `1px solid ${theme.earth}`,
              background: "transparent",
              color: theme.sage,
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 12,
            }}
          >
            {q}
          </button>
        ))}
      </div>

      <Card style={{ flex: 1, overflowY: "auto", padding: 16, marginBottom: 12, display: "flex", flexDirection: "column", gap: 12 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "78%",
              padding: "12px 16px",
              borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
              background: m.role === "user" ? `linear-gradient(135deg, ${theme.leaf}, ${theme.sprout})` : `rgba(255,248,238,0.08)`,
              border: m.role === "bot" ? `1px solid ${theme.earth}44` : "none",
              color: theme.cream,
              lineHeight: 1.7,
              fontSize: 14,
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 6, padding: 12 }}>
            {[0, 1, 2].map(i => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: theme.sage,
                  animation: `bounce 1.2s ${i * 0.2}s infinite`
                }}
              />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </Card>

      <div style={{ display: "flex", gap: 12 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about diseases, fertilizers, weather, schemes..."
          style={{
            flex: 1,
            background: "rgba(255,248,238,0.06)",
            border: `1px solid ${theme.earth}`,
            borderRadius: 12,
            padding: "12px 16px",
            color: theme.cream,
            fontFamily: "inherit",
            fontSize: 14,
            outline: "none",
          }}
        />
        <Btn icon="send" onClick={send} loading={loading} />
      </div>
    </div>
  );
};

export default Chatbot;