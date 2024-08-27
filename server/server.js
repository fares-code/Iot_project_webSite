import express from 'express';
import ConnectDB from './config/db.js';
import color from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRouter from './Routers/authroutes.js';
import mqtt from 'mqtt';
import fs from 'fs';
import MqttModel from './models/MqttModel.js';
dotenv.config()
const app = express();
const port = process.env.PORT || 5000;
let data_publish_opject = {};

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.bgYellow);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRouter);
// Connect to Database
ConnectDB();

// POST data to the database and publish to MQTT broker
app.post('/api/v1/auth/send-mqtt-data', async (req, res) => {
  try {
    const { Temperature_Target, Door_Status_Target } = req.body;

    // Creating a new MqttModel document
    const mqttData = new MqttModel({
      Temperature_Target,
      Door_Status_Target,
    });

    // Save the document to the database
    await mqttData.save();

    // Fetching the saved document by its ID (selecting the relevant fields)
    const getMqttData = await MqttModel.findById(mqttData._id).select('-_id -__v');

    // Transforming the data to the desired format
    data_publish_opject = {
      Temperature_Target: getMqttData.Temperature_Target,
      Door_Status_Target: getMqttData.Door_Status_Target ? 1 : 0,
    };

    // Console logging for debugging purposes
    console.log("transformedData", data_publish_opject);

    // Publish the message to the MQTT broker
    const Temperature = data_publish_opject.Temperature_Target;
    const Door_Status = data_publish_opject.Door_Status_Target;

    client.publish(mqtt_publish_topic, JSON.stringify({
      Temperature_Target: Temperature,
      Door_Status_Target: Door_Status
    }), (err) => {
      if (err) {
        console.error(`Failed to publish message: ${err}`);
      } else {
        console.log(`Message published to ${mqtt_publish_topic}`);
      }
    });

    // Send success response with the transformed data
    res.status(200).json({
      success: true,
      message: "Data transformed and published successfully",
      mqttData: data_publish_opject // Sending the transformed data back
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      success: false,
      message: "Message broker error",
    });
  }
});

// Get message from MQTT broker
app.get('/api/v1/auth/message-broker', (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Get Message from broker successfully",
      message_from_topic: message_from_topic // Send the latest MQTT message
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: "Message broker error"
    });
  }
});

// MQTT Configuration
const mqtt_server = 'mqtts://8dcfb0ee6c054a3988330330ad196158.s1.eu.hivemq.cloud:8883';
const mqtt_username = 'MoBakr99';
const mqtt_password = 'MoBakr2020';
const mqtt_publish_topic = 'Fridge Commands';
const mqtt_subscribe_topic = 'Fridge Details';

// Correctly format the file path for Node.js (escaping backslashes)
const root_ca_path = 'C:\\Users\\Data\\Desktop\\IOT_Project\\server\\root_ca.pem';

// Load the SSL/TLS certificate
const root_ca = fs.readFileSync(root_ca_path, 'utf-8');

// MQTT Client Options
const options = {
  username: mqtt_username,
  password: mqtt_password,
  ca: root_ca,
  rejectUnauthorized: true // Ensure the server certificate is validated
};

// Declare message_from_topic globally
let message_from_topic = 'No message received yet.';

// Connect to MQTT broker
const client = mqtt.connect(mqtt_server, options);

client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe to topic
  client.subscribe(mqtt_subscribe_topic, (err) => {
    if (!err) {
      console.log(`Subscribed to ${mqtt_subscribe_topic}`);
    } else {
      console.error(`Failed to subscribe: ${err}`);
    }
  });
});

// Handle incoming messages
client.on('message', (topic, message) => {
  message_from_topic = message.toString(); // Update the global variable
  console.log(`Received message on ${topic}: ${message_from_topic}`);
});

client.on('error', (err) => {
  console.error(`Connection error: ${err}`);
});
