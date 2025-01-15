import React, { useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native"; // Tilføjet navigation
import { auth } from "../firebase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/diy/retrove.png")} style={styles.logo} />

      {/* Fejlmeddelelse */}
      {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {/* Login Knappen */}
      <Button title="Login" onPress={handleLogin} />

      {/* Link til Signup */}
      <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={styles.signupLink}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Centrer indholdet horisontalt
    backgroundColor: "#f9f9f9", // Lys baggrundsfarve
  },
  logo: {
    width: 200, // Øget bredden
    height: 200, // Øget højden
    marginBottom: 20, // Giver plads mellem logoet og titlen
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  errorMsg: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: "white", // Hvid baggrund for inputfelter
  },
  signupLink: {
    marginTop: 20,
  },
  signupText: {
    color: "blue",
    textAlign: "center",
    textDecorationLine: "underline", // Understreget tekst for link-effekt
  },
});