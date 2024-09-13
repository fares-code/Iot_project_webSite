import React, { useState } from 'react';
import Layout from "../Layout/Layout";
import { Outlet } from 'react-router-dom';
import "./Home.css";

// Import the local image
import fridgeImage1 from "../pges/WhatsApp Image 2024-08-25 at 6.46.55 PM.png"; // Adjust the path if necessary
import fridgeImage2 from "../pges/WhatsApp Image 2024-08-26 at 8.32.34 PM.png"; // Adjust the path if necessary
import fridgeImage3 from "../pges/WhatsApp Image 2024-08-26 at 9.17.22 PM (1).png"; // Adjust the path if necessary
import fridgeImage4 from "../pges/2.png"; // Adjust the path if necessary

// Example image data
const images = [
  {
    src: fridgeImage1,  // Use the imported image
    alt: "Fridge 1",
  },
  {
    src:fridgeImage2,
    alt: "Fridge 2",
  },
  {
    src:fridgeImage3,
    alt: "Fridge 3",
  },
  {
    src: fridgeImage4,
    alt: "Fridge 4",
  }
];

export default function Home() {
  const [mainImage, setMainImage] = useState(images[0]);

  const handleImageClick = (image) => {
    setMainImage(image);
  };
  return (
    <Layout>
      <h1  style={{ color: "#fff"}} className='text-center'>OUR IOT PROJECT</h1>
      <div style={{ backgroundColor: "#2c2c2c", padding: "20px" }} className="home-page">
        <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "20px" }}>
          A compact smart fridge developed as part of an IoT project, combining sleek design with advanced remote control and monitoring technology
        </h2>
        <div className="d-flex flex-column align-items-center">
          {/* Main Image */}
          <div style={{ width: "400px", height: "300px", marginBottom: "20px" }}>
            <img
              src={mainImage.src}
              alt={mainImage.alt}
              className="main-image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px"
              }}
            />
          </div>

          {/* Thumbnails */}
          <div className="d-flex flex-wrap justify-content-center">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                onClick={() => handleImageClick(image)}
                style={{
                  width: "150px",
                  height: "100px",
                  margin: "10px",
                  cursor: "pointer",
                  objectFit: "cover",
                  border: mainImage.src === image.src ? "2px solid #fff" : "2px solid transparent",
                  transition: "border 0.3s",
                  borderRadius: "5px"
                }}
              />
            ))}
          </div>
        </div>
        <Outlet />
      </div>
    </Layout>
  );
}




