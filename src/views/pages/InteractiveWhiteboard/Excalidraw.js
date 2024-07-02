import { Excalidraw } from '@excalidraw/excalidraw';
import React, { useState, useRef, useEffect } from 'react';
// import { Excalidraw, useExcalidraw } from '@excalidraw/excalidraw';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server URL

const ExcalidrawComponent = () => {
  const [data, setData] = useState([]);
  const excalidrawRef = useRef(null);
  // const { actions } = useExcalidraw({
  //   initialData: data,
  // });

  useEffect(() => {
    socket.on('update-diagram', (newData) => {
      setData(newData);
    });
  }, []);

  useEffect(() => {
    if (excalidrawRef.current) {
      excalidrawRef.current.updateScene(data);
    }
  }, [data]);

  const handleUpdate = (elements) => {
    setData(elements);
    socket.emit('update-diagram', elements);
  };

  return (
    <div className='h-96'>
      <Excalidraw ref={excalidrawRef} onUpdate={handleUpdate} />
    </div>
  );
};

export default ExcalidrawComponent;
