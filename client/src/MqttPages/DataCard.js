import React from 'react';

export default function DataCard({ label, value, unit }) {
  return (
    <div style={cardStyle}>
      <h3 style={labelStyle}>{label}</h3>
      <p style={valueStyle}>
        {value} {unit && <span>{unit}</span>}
      </p>
    </div>
  );
}

// Styles
const cardStyle = {
  backgroundColor: '#34495e',
  borderRadius: '10px',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  textAlign: 'center',
  width: '30%',
  color: 'white',
};

const labelStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const valueStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
};
