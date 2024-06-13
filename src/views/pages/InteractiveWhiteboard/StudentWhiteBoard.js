import React, { useEffect, useRef, useState } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import io from 'socket.io-client';
import { Button, Grid, Typography } from '@mui/material';

const socket = io('http://localhost:3001');

const StudentWhiteBoard = ({ classId, studentId }) => {
  const [paths, setPaths] = useState([]);
  const canvasRef = useRef();

  useEffect(() => {
    socket.emit('joinWhiteboard', { classId, studentId });

    socket.on('initBoard', (initialPaths) => {
      setPaths(initialPaths);
    });

    socket.on('drawing', (updatedPaths) => {
      setPaths(updatedPaths);
    });

    return () => {
      socket.disconnect();
    };
  }, [classId, studentId]);

  const handleDraw = (newPaths) => {
    socket.emit('drawing', { classId, studentId, paths: newPaths });
  };

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h6">Papan Gambar Siswa {studentId}</Typography>
      <ReactSketchCanvas
        ref={canvasRef}
        height="400px"
        strokeWidth={5}
        strokeColor="#000000"
        backgroundColor="#ffffff"
        allowOnlyPointerType="all"
        onChange={handleDraw}
        initialPaths={paths}
      />
    </Grid>
  );
};

export default StudentWhiteBoard;
