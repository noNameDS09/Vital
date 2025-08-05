// components/AlertPopup.js
'use client'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // change to your backend host in production

export default function AlertPopup() {
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    socket.on('alert', (message) => {
      setAlertMessage(message);

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setAlertMessage(null);
      }, 5000);
    });

    return () => {
      socket.off('alert');
    };
  }, []);

  return (
    <>
      {alertMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: 'red',
          color: 'white',
          padding: '15px',
          borderRadius: '5px',
          zIndex: 1000,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
        }}>
          🔔 {alertMessage}
        </div>
      )}
    </>
  );
}
