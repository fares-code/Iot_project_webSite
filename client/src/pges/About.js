import React, { useEffect, useState } from 'react';
import CardComponent from '../Components/CardComponneet.js'; // Adjust the import path if necessary
import { Axios } from '../Axios/Axios.js';
import './AboutUs.css'; // Import the CSS file

export default function AboutUs() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const getMembers = async () => {
      try {
        setLoading(true)
        const res = await Axios.get('/get-member');
        console.log(res.data.allMembers);
        setUsers(res.data.allMembers);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    getMembers();
  }, []);

  const convertBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return `data:image/jpeg;base64,${btoa(binary)}`;
  };



 return (
  <div>
    {loading ? (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2 >Waiting...</h2>
      </div>
    ) : (
      <div >
        <h1 className="title">About Us</h1>
        <div className="card-container">
          {users.map((student, index) => (
            <CardComponent
              key={index}
              photo={convertBufferToBase64(student.photo.data.data)} // Convert buffer to base64
              name={student.name}
              cgpa={student.cgpa}
              age={student.age}
              department={student.department}
            />
          ))}
        </div>
      </div>
    )}
  </div>
);}

