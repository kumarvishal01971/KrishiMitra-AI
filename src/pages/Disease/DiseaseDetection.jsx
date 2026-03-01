// src/pages/Disease/DiseaseDetection.jsx
import React, { useState, useRef } from 'react';
import Card from '../../components/common/Card';
import Btn from '../../components/common/Button';
import Icon from '../../components/common/Icon';
import UploadBox from './UploadBox';
import DiagnosisResult from './DiagnosisResult';
import { theme } from '../../styles/theme';
import { predictDisease, demoDiseaseResult } from '../../api/api';

const DiseaseDetection = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [drag, setDrag] = useState(false);
  const fileRef = useRef();

  const handleFile = (f) => {
    setFile(f);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const detect = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const data = await predictDisease(file);
      setResult(data);
    } catch {
      setResult(demoDiseaseResult);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div>
        <h2 style={{ color: theme.wheat, fontFamily: "'Playfair Display', serif", fontSize: 28, marginBottom: 8 }}>
          Plant Disease Detection
        </h2>
        <p style={{ color: theme.mist, marginBottom: 24, opacity: 0.8, fontSize: 14 }}>
          Upload a photo of your plant leaf. Our Keras AI model will analyze and diagnose diseases instantly.
        </p>

        <UploadBox
          drag={drag}
          setDrag={setDrag}
          preview={preview}
          handleFile={handleFile}
          fileRef={fileRef}
        />

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <Btn 
            icon="camera" 
            onClick={detect} 
            loading={loading} 
            disabled={!file}
            style={{ background: `linear-gradient(135deg, #1A4D2E, #2D7A3F)` }}
          >
            Analyze Plant
          </Btn>
          {preview && (
            <Btn variant="ghost" onClick={() => { setFile(null); setPreview(null); setResult(null); }}>
              Clear
            </Btn>
          )}
        </div>
      </div>

      <div style={{ marginTop: result ? 40 : 0 }}>
        {!result ? (
          <Card style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
            <div style={{ padding: 24, borderRadius: "50%", background: `${theme.earth}33` }}>
              <Icon name="leaf" size={40} color={theme.clay} />
            </div>
            <p style={{ color: theme.mist, opacity: 0.6, textAlign: "center" }}>
              Upload a plant image to see<br />AI diagnosis results here
            </p>
          </Card>
        ) : result.error ? (
          <Card>
            <p style={{ color: theme.wheat, marginBottom: 16, fontSize: 12 }}>{result.error}</p>
            <DiagnosisResult result={result} />
          </Card>
        ) : (
          <Card>
            <DiagnosisResult result={result} />
          </Card>
        )}
      </div>
    </div>
  );
};

export default DiseaseDetection;