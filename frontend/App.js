import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';
import io from 'socket.io-client';

const socket = io('https://your-backend-url.com');

export default function App() {
  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });

  const startVideo = async () => {
    const stream = await mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);
    stream.getTracks().forEach(track => pc.addTrack(track, stream));
  };

  useEffect(() => {
    socket.on('incoming_call_signal', async ({ offer, from }) => {
      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('answer_call', { to: from, answer });
    });

    pc.ontrack = (event) => setRemoteStream(event.streams[0]);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#121212' }}>
      {remoteStream && <RTCView streamURL={remoteStream.toURL()} style={{ flex: 1 }} />}
      {localStream && <RTCView streamURL={localStream.toURL()} style={{ width: 150, height: 200, position: 'absolute', top: 50, right: 20 }} />}
      <TouchableOpacity onPress={startVideo} style={{ position: 'absolute', bottom: 50, alignSelf: 'center' }}>
        <Text style={{ color: 'white', backgroundColor: 'green', padding: 20 }}>Start Call</Text>
      </TouchableOpacity>
    </View>
  );
}
