// src/components/LandingPage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid';

const LandingPage = () => {
  const [roomCode, setRoomCode] = useState('');
  const history = useHistory();

  const createRoom = () => {
    const newRoomCode = nanoid(6);
    history.push(`/room-interaktif-student/${newRoomCode}?isInstructor=true`);
  };

  const joinRoom = () => {
    if (roomCode.trim()) {
      history.push(`/room-interaktif-student/${roomCode}`);
    }
  };

  return (
    <div>
      <button onClick={createRoom}>Create Room</button>
      <input
        type="text"
        placeholder="Enter Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};

export default LandingPage;
