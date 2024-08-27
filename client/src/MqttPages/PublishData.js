import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PublishData() {
  // State for form inputs
  const [temperatureTarget, setTemperatureTarget] = useState(20); // Default value for slider
  const [doorStatusTarget, setDoorStatusTarget] = useState(false);

  // Function to send data to the API
  const sendData = async () => {
    const formData = {
      Temperature_Target: temperatureTarget,
      Door_Status_Target: doorStatusTarget,
    };

    try {
      // Sending data to the API endpoint using axios
      const response = await axios.post('http://localhost:5000/api/v1/auth/send-mqtt-data', formData);

      // Handle success (e.g., display a success message)
      toast.success('Data sent successfully!');
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      // Handle error (e.g., display an error message)
      toast.error('Error sending data. Please try again.');
      console.error('Error sending data:', error);
    }
  };

  // Use useEffect to call sendData whenever temperatureTarget or doorStatusTarget changes
  useEffect(() => {
    sendData();
  }, [temperatureTarget, doorStatusTarget]);

  return (
    <div className="container mt-4" style={styles.container}>
      <h2 className="text-center" style={styles.header}>This is DashBoard for Control Fridge Temperatur</h2>
      <form>
        {/* Temperature Target Slider */}
        <div className="form-group">
          <label htmlFor="temperature" style={styles.label}>Temperature Target:</label>
          <input
            type="range"
            id="temperature"
            className="custom-range"
            min="-10"
            max="20"
            step="1"
            value={temperatureTarget}
            onChange={(e) => setTemperatureTarget(Number(e.target.value))}
            style={{
              ...styles.rangeSlider,
              background: `linear-gradient(90deg, #0d6efd ${temperatureTarget}%, #ddd ${temperatureTarget}%)`
            }}
          />
          <p style={styles.temperatureDisplay}>Current Temperature: {temperatureTarget}°C</p>
        </div>

        {/* Door Status Target Field */}
        <div className="form-group mt-3">
          <label htmlFor="doorStatus" style={styles.label}>Door Status Target:</label>
          <div className="custom-checkbox">
            <input
              type="checkbox"
              id="doorStatus"
              className="custom-checkbox-input"
              checked={doorStatusTarget}
              onChange={(e) => setDoorStatusTarget(e.target.checked)}
              style={{
                ...styles.checkbox,
                backgroundColor: doorStatusTarget ? '#0d6efd' : '#ccc',
              }}
            />
            <label htmlFor="doorStatus" style={styles.checkboxLabel}>
              {doorStatusTarget ? 'Door Open' : 'Door Closed'}
            </label>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: '900px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#2c3e50',
    color: 'white',
  },
  header: {
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  label: {
    color: '#ecf0f1',
    fontSize: '16px',
  },
  rangeSlider: {
    width: '100%',
    appearance: 'none',
    height: '8px',
    borderRadius: '5px',
    outline: 'none',
    transition: 'background 0.3s ease',
  },
  temperatureDisplay: {
    marginTop: '10px',
    fontSize: '18px',
  },
  checkbox: {
    width: '24px',
    height: '24px',
    display: 'inline-block',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  checkboxLabel: {
    marginLeft: '10px',
    fontSize: '16px',
  },
};


