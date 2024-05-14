import React, { useRef, useEffect } from 'react';

function Camera() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const screenRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const socketRef = useRef(null);
  const screenRecorderRef = useRef(null);
  const recordedScreenChunksRef = useRef([]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

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

    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const startAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioRef.current.srcObject = stream;

      stream.getAudioTracks().forEach(track => peerConnectionRef.current.addTrack(track, stream));
    } catch (error) {
      console.log('Gagal mengakses audio:', error);
    }
  };

  const stopAudio = () => {
    if (audioRef.current.srcObject) {
      audioRef.current.srcObject.getTracks().forEach(track => track.stop());
      audioRef.current.srcObject = null;
    }
  };

  const startScreenSharing = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      screenRef.current.srcObject = screenStream;

      screenStream.getVideoTracks().forEach(track => peerConnectionRef.current.addTrack(track, screenStream));
    } catch (error) {
      console.log('Gagal mengakses berbagi layar:', error);
    }
  };

  const stopScreenSharing = () => {
    if (screenRef.current.srcObject) {
      screenRef.current.srcObject.getTracks().forEach(track => track.stop());
      screenRef.current.srcObject = null;
    }
  };

  const startScreenRecording = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      screenRecorderRef.current = new MediaRecorder(screenStream, { mimeType: 'video/webm' });

      screenRecorderRef.current.ondataavailable = event => {
        if (event.data.size > 0) {
          recordedScreenChunksRef.current.push(event.data);
        }
      };

      screenRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedScreenChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'screen_recording.webm';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        recordedScreenChunksRef.current = [];
      };

      screenRecorderRef.current.start();
    } catch (error) {
      console.log('Gagal mengakses rekaman layar:', error);
    }
  };

  const stopScreenRecording = () => {
    if (screenRecorderRef.current) {
      screenRecorderRef.current.stop();
    }
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

    return () => {
      socketRef.current.close();
    };
  }, []);

  return (
    <div>
      <button className='ml-5' onClick={startAudio}>Nyalakan Audio</button>
      <button className='ml-5' onClick={stopAudio}>Matikan Audio</button>
      <button className='ml-5' onClick={startCamera}>Nyalakan Kamera</button>
      <button className='ml-5' onClick={stopCamera}>Matikan Kamera</button>
      <button className='ml-5' onClick={startScreenSharing}>Mulai Berbagi Layar</button>
      <button className='ml-5' onClick={stopScreenSharing}>Hentikan Berbagi Layar</button>
      <button className='ml-5' onClick={startScreenRecording}>Mulai Rekam Layar</button>
      <button className='ml-5' onClick={stopScreenRecording}>Hentikan Rekam Layar</button>
      <video ref={videoRef} autoPlay></video> 
      <audio ref={audioRef} autoPlay></audio>
      <video ref={screenRef} autoPlay></video>
    </div>
  );
}

export default Camera;