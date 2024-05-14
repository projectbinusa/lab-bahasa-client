import React, { useRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable';

function Camera() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const screenRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [screenRecording, setScreenRecording] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
      peerConnectionRef.current = new RTCPeerConnection(configuration);

      stream.getVideoTracks().forEach(track => peerConnectionRef.current.addTrack(track, stream));
    } catch (error) {
      console.log('Gagal mengakses kamera:', error);
    }
  };

  const stopCamera = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const startAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (audioRef.current) {
        audioRef.current.srcObject = stream;
      }

      stream.getAudioTracks().forEach(track => peerConnectionRef.current.addTrack(track, stream));
    } catch (error) {
      console.log('Gagal mengakses audio:', error);
    }
  };

  const stopAudio = () => {
    if (audioRef.current && audioRef.current.srcObject) {
      audioRef.current.srcObject.getTracks().forEach(track => track.stop());
      audioRef.current.srcObject = null;
    }
  };

  const startScreenSharing = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      if (screenRef.current) {
        screenRef.current.srcObject = screenStream;
      }

      screenStream.getVideoTracks().forEach(track => peerConnectionRef.current.addTrack(track, screenStream));
    } catch (error) {
      console.log('Gagal mengakses berbagi layar:', error);
    }
  };

  const stopScreenSharing = () => {
    if (screenRef.current && screenRef.current.srcObject) {
      screenRef.current.srcObject.getTracks().forEach(track => track.stop());
      screenRef.current.srcObject = null;
    }
  };

  const startScreenRecording = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      if (screenRef.current) {
        screenRef.current.srcObject = screenStream;
      }

      mediaRecorderRef.current = new MediaRecorder(screenStream, { mimeType: 'video/webm' });

      mediaRecorderRef.current.ondataavailable = event => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'screen_recording.webm';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        recordedChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setScreenRecording(true);
    } catch (error) {
      console.log('Gagal mengakses rekaman layar:', error);
    }
  };

  const stopScreenRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    setScreenRecording(false);
  };

  useEffect(() => {
    socketRef.current = new WebSocket('wss://your-signaling-server-url');

    socketRef.current.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.type === 'answer') {
        peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(message.answer));
      } else if (message.type === 'candidate') {
        if (peerConnectionRef.current) {
          peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(message.candidate));
        }
      }
    };

    socketRef.current.onopen = () => {
      console.log('Terhubung ke server sinyal');
    };

    socketRef.current.onerror = error => {
      console.log('WebSocket error:', error);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  return (
    <div className="container">
      <div className="controls">
        <button className='ml-5' onClick={startAudio}>Nyalakan Audio</button>
        <button className='ml-5' onClick={stopAudio}>Matikan Audio</button>
        <button className='ml-5' onClick={startCamera}>Nyalakan Kamera</button>
        <button className='ml-5' onClick={stopCamera}>Matikan Kamera</button>
        <button className='ml-5' onClick={startScreenSharing}>Mulai Berbagi Layar</button>
        <button className='ml-5' onClick={stopScreenSharing}>Hentikan Berbagi Layar</button>
        <button className='ml-5' onClick={startScreenRecording} disabled={screenRecording}>
          Mulai Rekam Layar
        </button>
        <button className='ml-5' onClick={stopScreenRecording} disabled={!screenRecording}>
          Hentikan Rekam Layar
        </button>
      </div>
      <div className="screen-container">
        <video ref={screenRef} autoPlay className="screen"></video>
      </div>
      <Draggable>
        <div className="camera-container">
          <video ref={videoRef} autoPlay className="camera"></video>
        </div>
      </Draggable>
      <style>{`
      .container {
        position: relative;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
      }
      
      .controls {
        display: flex;
        justify-content: center;
        margin: 10px 0;
      }
      
      .screen-container {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .screen {
        width: 80%;
        height: 80%;
        border: 2px solid #ccc;
      }
      
      .camera-container {
        position: absolute;
        width: 230px;
        height: 180px;
        border: 2px solid #ccc;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        cursor: move;
      }
      
      .camera {
        width: 100%;
        height: 100%;
      }      
      `}</style>
    </div>
  );
}

export default Camera;
