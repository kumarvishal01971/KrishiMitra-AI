// src/pages/Disease/DiagnosisResult.jsx
import React from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { theme, severityColor } from '../../styles/theme';

const DiagnosisResult = ({ result }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
      <div>
        <p style={{ color: theme.mist, fontSize: 12, marginBottom: 4 }}>DETECTED DISEASE</p>
        <h3 style={{ color: theme.cream, fontSize: 22, fontFamily: "'Playfair Display', serif" }}>{result.disease}</h3>
      </div>
      {result.severity && (
        <Badge color={severityColor[result.severity] || theme.wheat}>{result.severity} Risk</Badge>
      )}
    </div>

    {result.confidence && (
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ color: theme.mist, fontSize: 12 }}>Confidence</span>
          <span style={{ color: theme.wheat, fontSize: 12, fontWeight: 700 }}>{(result.confidence * 100).toFixed(1)}%</span>
        </div>
        <div style={{ background: `${theme.earth}44`, borderRadius: 999, height: 6 }}>
          <div style={{
            width: `${result.confidence * 100}%`,
            height: 6,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${theme.leaf}, ${theme.wheat})`
          }} />
        </div>
      </div>
    )}

    <div style={{ background: `${theme.sky}33`, borderRadius: 12, padding: 26, borderLeft: `3px solid ${theme.rain}` }}>
      <p style={{ color: theme.mist, fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>TREATMENT SOLUTION</p>
      <p style={{ color: theme.cream, lineHeight: 1.7, fontSize: 14 }}>{result.solution}</p>
    </div>
  </div>
);

export default DiagnosisResult;