import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { CryptoEngine } from '../utils/crypto'; // Import the utility we just made

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !password) {
      return Alert.alert("Error", "Please fill in all fields.");
    }

    setLoading(true);
    try {
      // 1. GENERATE CRYPTOGRAPHIC IDENTITY LOCALLY
      // This saves the Private Key in SecureStore and gives us the Public Key
      const publicKey = await CryptoEngine.generateIdentity();

      // 2. SEND TO BACKEND
      const response = await fetch('https://your-api-url.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.toLowerCase(),
          password: password, // You should hash this on the backend with Bcrypt
          publicKey: publicKey // This is what others will use to encrypt messages to you
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success 🛡️", "Identity created. Your private key is secured on this device.");
        navigation.navigate('Login');
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      Alert.alert("Shield Failure", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>crypChat 🛡️</Text>
      <Text style={styles.subtitle}>Privacy-First. No PII. Just Code.</Text>

      <TextInput
        style={styles.input}
        placeholder="Choose a Username"
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Set a Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>GENERATE IDENTITY</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', padding: 20 },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#38bdf8', textAlign: 'center' },
  subtitle: { color: '#94a3b8', textAlign: 'center', marginBottom: 40 },
  input: {
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#334155'
  },
  button: {
    backgroundColor: '#38bdf8',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: { color: '#0f172a', fontWeight: 'bold', letterSpacing: 1.2 }
});

export default RegisterScreen;
                                         
