// src/components/RoomPage.js
import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ExcalidrawContainer from './Excalidraw';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RoomPage = () => {
  const { roomCode } = useParams();
  const query = useQuery();
  const isInstructor = query.get('isInstructor') === 'true';
  const [individualMode, setIndividualMode] = useState(false);

  return (
    <div>
      <ExcalidrawContainer
        roomCode={roomCode}
        isInstructor={isInstructor}
        individualMode={individualMode}
      />
      {isInstructor && (
        <button onClick={() => setIndividualMode(!individualMode)}>
          Toggle Individual Mode
        </button>
      )}
    </div>
  );
};

export default RoomPage;
