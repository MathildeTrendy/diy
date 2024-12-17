import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet} from 'react-native';
import app from '../config/firebase';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import firebaseConfig from "../config/firebase"; // Din Firebase config
import { initializeApp } from 'firebase/app';


//const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');



  // Login-funktion
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logget in');
      // Navigate to another screen upon successful login
    } catch (e) {
      setError(e.message); // Handle any errors
    }
  };

  return (
    <View style={StyleSheet.container}>
      <TextInput
        style={StyleSheet.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Adgangskode"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    error: {
      color: 'red',
      marginBottom: 12,
    },
  });
  
  export default LoginScreen;
