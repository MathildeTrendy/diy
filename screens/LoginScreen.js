import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet} from 'react-native';
import app from '../config/firebase';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const auth = getAuth(app);


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
