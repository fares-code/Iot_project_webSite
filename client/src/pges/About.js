import React, { useCallback, useEffect, useState } from 'react';
import CardComponent from '../Components/CardComponneet.js'; // Adjust the import path if necessary
import { Axios } from '../Axios/Axios.js';
import { Spin } from 'antd';
import './AboutUs.css'; // Import the CSS file

export default function AboutUs() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const getMembers =
  
  useCallback( async () => {
    try {
      setLoading(true)
      const {data} = await Axios.get('/get-member');
      console.log(data.allMembers);
      setUsers(data.allMembers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  },[]);

  useEffect(() => {
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
       <Spin size='large'/>
        <h5 style={{marginTop:"10px"}}>Waiting team</h5>
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

