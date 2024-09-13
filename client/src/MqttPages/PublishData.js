import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Slider, Switch, Spin  } from 'antd';
import 'react-toastify/dist/ReactToastify.css';

export default function PublishData() {
  const [temperatureTarget, setTemperatureTarget] = useState(0); // Default value for slider
  const [doorStatusTarget, setDoorStatusTarget] = useState(false);

  // Function to send data to the API
  const sendData = async () => {
    const formData = {
      Temperature_Target: temperatureTarget,
      Door_Status_Target: doorStatusTarget,
    };

    try {
      const response = await axios.post('https://iot-project-web-site.vercel.app/send-mqtt-data', formData);
      toast.success('Data sent successfully!');
      console.log('Data sent successfully:', response.data);
    } catch (error) {
      toast.error('Error sending data. Please try again.');
      console.error('Error sending data:', error);
    }
  };

  useEffect(() => {
    sendData();
  }, [temperatureTarget, doorStatusTarget]);

  const handleSliderChange = (value) => {
    setTemperatureTarget(value);
  };

  const handleSwitchChange = (checked) => {
    setDoorStatusTarget(checked);
  };

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
    temperatureDisplay: {
      marginTop: '10px',
      fontSize: '18px',
    },
    checkboxLabel: {
      marginLeft: '10px',
      fontSize: '16px',
    },
  };

  return (
    <div className="container mt-4" style={styles.container}>
      <h2 className="text-center" style={styles.header}>This is Dashboard for Control Fridge Temperature</h2>
      <form>
        {/* Temperature Target Slider */}
        <div className="form-group">
          <label htmlFor="temperature" style={styles.label}>Temperature Target:</label>
          <Slider
            min={-10}
            max={20}
            step={1}
            value={temperatureTarget}
            onChange={handleSliderChange}
            tooltipVisible
            trackStyle={{ backgroundColor: '#0d6efd' }}
            handleStyle={{ borderColor: '#0d6efd' }}
          />
          <p style={styles.temperatureDisplay}>Target Temperature: {temperatureTarget}°C</p>
        </div>

        {/* Door Status Target Switch */}
        <div className="form-group mt-3">
          <label htmlFor="doorStatus" style={styles.label}>Door Status Target:</label>
          <div className="custom-switch">
            <Switch
              checked={doorStatusTarget}
              onChange={handleSwitchChange}
              checkedChildren="Open"
              unCheckedChildren="Closed"
              style={{ backgroundColor: doorStatusTarget ? '#0d6efd' : '#ccc' }}
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
