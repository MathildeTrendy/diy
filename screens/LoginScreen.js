import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import firebase from './firebase'; // Importér firebase-konfigurationen
import {
    ScrollableMainContainer,
    StyledText,
    ProductInfo,
    StyledButton,
    CartCounter,
  } from "../components";

const LoginScreen = () => {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Login-funktion
  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('Bruger logget ind');
      // Naviger til en anden skærm, hvis login er succesfuldt
    } catch (e) {
      setError(e.message); // Håndter eventuelle fejl
    }
  };

  return (
    <View>
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
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

export default LoginScreen;
