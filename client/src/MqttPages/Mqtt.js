import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataCard from './DataCard.js';

export default function MqttDataDisplay() {
  const [mqttData, setMqttData] = useState({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/auth/message-broker');
        console.log('API Response:', res.data); // Log the full response to check the structure
        if (res.data && res.data.success) {
          setTimeout(() => {
            setCount(prevCount => prevCount + 1);
          }, 1000);
          
          // Log the message from topic to ensure it's what you expect
          console.log('MQTT Data:', JSON.parse(res.data.message_from_topic));

          // Assuming the API returns { "Temperature": 24, "Humidity": 40, "Door_Status": 0 }
          setMqttData(JSON.parse(res.data.message_from_topic));
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [count]);

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Fridge Status Dashboard</h1>
      <div style={cardContainerStyle}>
        {/* Conditionally rendering based on whether mqttData exists */}
        {Object.keys(mqttData).length > 0 ? (
          <>
            <DataCard label="Temperature" value={mqttData.Temperature !== undefined ? mqttData.Temperature : 'Loading...'} unit="°C" />
            <DataCard label="Humidity" value={mqttData.Humidity !== undefined ? mqttData.Humidity : 'Loading...'} unit="%" />
            <DataCard label="Door Status" value={mqttData.Door_Status === 0 ? 'Closed' : 'Open'} />
          </>
        ) : (
          <p style={{ color: 'white' }}>Waiting for data...</p>
        )}
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  minHeight: '40vh',
  backgroundColor: '#2c2c2c',
  padding: '20px',
  fontFamily: 'Arial',
};

const headerStyle = {
  color: 'white',
  marginBottom: '30px',
  fontSize: '2rem',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
};

const cardContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  maxWidth: '900px',
  gap: '20px',
  marginTop: '20px',
};
