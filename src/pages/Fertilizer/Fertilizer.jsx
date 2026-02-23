// src/pages/Fertilizer/Fertilizer.jsx
import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Btn from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Icon from '../../components/common/Icon';
import { theme } from '../../styles/theme';

const Fertilizer = () => {
  const [ph, setPh] = useState(6.5);
  const [crop, setCrop] = useState("Rice");
  const [disease, setDisease] = useState("");
  const [rec, setRec] = useState(null);

  const crops = ["Rice", "Wheat", "Tomato", "Cotton", "Maize", "Sugarcane", "Potato"];

  const getRecommendation = () => {
    let type, chemical, organic, notes;
    if (ph < 5.5) {
      type = "Acidic Soil";
      chemical = "Agricultural Lime (CaCO₃)";
      organic = "Wood ash, Dolomite";
      notes = "Apply lime 2-3 weeks before sowing. Avoid ammonium sulfate fertilizers.";
    } else if (ph > 7.5) {
      type = "Alkaline Soil";
      chemical = "Elemental Sulfur, Ammonium Sulfate";
      organic = "Peat moss, Pine needle mulch, Compost";
      notes = "Incorporate sulfur 6 months before planting. Add organic matter regularly.";
    } else {
      type = "Neutral/Ideal Soil";
      chemical = "Balanced NPK (20-20-20)";
      organic = "Well-composted farmyard manure, Vermicompost";
      notes = "Ideal pH range. Focus on balanced nutrition based on crop stage.";
    }

    const cropNPK = {
      Rice: "N:P:K = 120:60:60 kg/ha",
      Wheat: "N:P:K = 150:60:40 kg/ha",
      Tomato: "N:P:K = 180:60:120 kg/ha",
      Cotton: "N:P:K = 120:60:60 kg/ha",
      Maize: "N:P:K = 180:80:60 kg/ha",
      Sugarcane: "N:P:K = 250:80:120 kg/ha",
      Potato: "N:P:K = 200:100:200 kg/ha",
    };

    setRec({ type, chemical, organic, notes, npk: cropNPK[crop], disease });
  };

  return (
    <div>
      <h2 style={{ color: theme.wheat, fontFamily: "'Playfair Display', serif", fontSize: 28, marginBottom: 8 }}>
        Fertilizer Recommendation
      </h2>
      <p style={{ color: theme.mist, marginBottom: 24, opacity: 0.8, fontSize: 14 }}>
        pH-based soil analysis with crop-specific fertilizer guidance
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Card>
          <div style={{ marginBottom: 24 }}>
            <label style={{ color: theme.sage, fontSize: 12, fontWeight: 700, letterSpacing: 1, display: "block", marginBottom: 12 }}>
              SOIL pH LEVEL
            </label>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 48, fontWeight: 900, color: ph < 5.5 ? theme.alert : ph > 7.5 ? theme.wheat : theme.sprout }}>
                {ph.toFixed(1)}
              </span>
              <span style={{ color: theme.mist, marginLeft: 8 }}>
                {ph < 5.5 ? "Acidic" : ph > 7.5 ? "Alkaline" : "Neutral"}
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="10"
              step="0.1"
              value={ph}
              onChange={(e) => setPh(+e.target.value)}
              style={{ width: "100%", accentColor: theme.sprout, cursor: "pointer" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", color: theme.mist, fontSize: 11, marginTop: 4 }}>
              <span>Acidic (3)</span><span>Neutral (7)</span><span>Alkaline (10)</span>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ color: theme.sage, fontSize: 12, fontWeight: 700, letterSpacing: 1, display: "block", marginBottom: 8 }}>
              CROP TYPE
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {crops.map(c => (
                <button
                  key={c}
                  onClick={() => setCrop(c)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 999,
                    border: `1px solid ${crop === c ? theme.sprout : theme.earth}`,
                    background: crop === c ? `${theme.leaf}33` : "transparent",
                    color: crop === c ? theme.sprout : theme.mist,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 13,
                    transition: "all 0.2s",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ color: theme.sage, fontSize: 12, fontWeight: 700, letterSpacing: 1, display: "block", marginBottom: 8 }}>
              DISEASE (if detected)
            </label>
            <input
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              placeholder="e.g. Late Blight, Leaf Rust..."
              style={{
                width: "100%",
                background: "rgba(255,248,238,0.06)",
                border: `1px solid ${theme.earth}`,
                borderRadius: 12,
                padding: "10px 14px",
                color: theme.cream,
                fontFamily: "inherit",
                fontSize: 13,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <Btn icon="flask" onClick={getRecommendation} style={{ width: "100%" }}>
            Get Recommendation
          </Btn>
        </Card>

        <div>
          {rec ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Card style={{ background: `linear-gradient(135deg, ${theme.earth}33, ${theme.bark}33)` }}>
                <Badge>{rec.type}</Badge>
                <h3 style={{ color: theme.cream, margin: "12px 0 4px", fontFamily: "'Playfair Display', serif" }}>
                  {crop} Recommendations
                </h3>
                <p style={{ color: theme.wheat, fontSize: 13, fontWeight: 600 }}>{rec.npk}</p>
              </Card>

              {[
                { label: "CHEMICAL FERTILIZERS", value: rec.chemical, icon: "flask", border: theme.wheat },
                { label: "ORGANIC ALTERNATIVES", value: rec.organic, icon: "leaf", border: theme.sprout },
                { label: "APPLICATION NOTES", value: rec.notes, icon: "check", border: theme.rain }
              ].map((item, i) => (
                <Card key={i} style={{ borderLeft: `3px solid ${item.border}` }}>
                  <p style={{ color: item.border, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>
                    {item.label}
                  </p>
                  <p style={{ color: theme.cream, fontSize: 13, lineHeight: 1.7 }}>{item.value}</p>
                </Card>
              ))}

              {rec.disease && (
                <Card style={{ background: `${theme.alert}11`, borderLeft: `3px solid ${theme.alert}` }}>
                  <p style={{ color: theme.alert, fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>
                    DISEASE-SPECIFIC ADJUSTMENT
                  </p>
                  <p style={{ color: theme.cream, fontSize: 13, lineHeight: 1.7 }}>
                    Since your crop shows <strong>{rec.disease}</strong> symptoms with{' '}
                    {ph < 5.5 ? "acidic" : ph > 7.5 ? "alkaline" : "neutral"} soil (pH {ph}), increase Potassium (K) application
                    to boost plant immunity and improve resistance. Consider foliar spray of potassium silicate.
                  </p>
                </Card>
              )}
            </div>
          ) : (
            <Card style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
              <Icon name="flask" size={40} color={theme.clay} />
              <p style={{ color: theme.mist, opacity: 0.6, textAlign: "center" }}>
                Adjust pH and select crop<br />to get fertilizer recommendations
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fertilizer;