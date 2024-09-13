import React from 'react';
import './CardStyle.css'
import 'bootstrap/dist/css/bootstrap.min.css';

    function CardComponent({ photo, name, cgpa, age, department }) {
      return (
        <div className="card dark-card">
          <div className="card-img-container">
            <img  src={photo} className="card-img-top" alt={name} />
          </div>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text"><strong>CGPA:</strong> {cgpa}</p>
            <p className="card-text"><strong>Age:</strong> {age}</p>
            <p className="card-text"><strong>Department:</strong> {department}</p>
          </div>
        </div>
      );
    }
  
 

export default CardComponent;


