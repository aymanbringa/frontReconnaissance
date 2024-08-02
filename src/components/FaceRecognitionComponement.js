// FacialRecognition.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function FacialRecognition() {
  const [imageDataUrl, setImageDataUrl] = useState('');
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.error("Error accessing camera: ", err));
  }, []);

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/jpeg');
    setImageDataUrl(imageDataUrl);

    AuthService.captureAndSendImage(imageDataUrl)
      .then(response => {
        console.log("Facial recognition response:", response);
        if (response.userId) {
          navigate(`/profile/${response.userId}`); // Redirect to profile page
        }
      })
      .catch(error => {
        console.error("Error sending image:", error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (imageDataUrl === '') {
        captureImage();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [imageDataUrl]);

  return (
    <div className="bringa">
      <div className="loginBox">
        <div id="video-container">
          <video ref={videoRef} autoPlay></video>
          <button onClick={captureImage}>Capture Image</button>
        </div>
        {imageDataUrl && <img src={imageDataUrl} alt="Captured" />}
      </div>
    </div>
  );
}

export default FacialRecognition;
