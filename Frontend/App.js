import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';
import * as SQLite from 'expo-sqlite';
import io from 'socket.io-client';

const db = SQLite.openDatabase('crypchat_local.db');
const socket = io('http://YOUR_SERVER_IP:3000');

export default function App() {
    const [localStream, setLocalStream] = useState();

    useEffect(() => {
        // Initialize local SQLite for encrypted chat history
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, content TEXT)');
        });
    }, []);

    const startStream = async () => {
        const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
        setLocalStream(stream);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
            {localStream && <RTCView streamURL={localStream.toURL()} style={{ width: 300, height: 400 }} />}
            <TouchableOpacity onPress={startStream}>
                <Text style={{ color: 'white', padding: 20, backgroundColor: 'blue' }}>Start Call</Text>
            </TouchableOpacity>
        </View>
    );
  }
              
