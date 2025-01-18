import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(""); 

  const evaluatePasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength += 1;
    if (/[A-Z]/.test(pwd)) strength += 1;
    if (/[a-z]/.test(pwd)) strength += 1;
    if (/[0-9]/.test(pwd)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 1;

    switch (strength) {
      case 0:
      case 1:
      case 2:
        return "Weak";
      case 3:
      case 4:
        return "Medium";
      case 5:
        return "Strong";
      default:
        return "";
    }
  };

  const handlePasswordChange = (pwd) => { 
    setPassword(pwd);
    setPasswordStrength(evaluatePasswordStrength(pwd));
  };

  const handleSignup = async () => {
    if (!email || !username || !password || !confirmPassword) { 
      setErrorMsg("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) { 
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredential.user;

     
      await updateProfile(user, { displayName: username });

      setSuccessMsg("Account created successfully!");
      setErrorMsg("");
    } catch (error) {
      setErrorMsg(error.message);
      setSuccessMsg("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
      {successMsg ? <Text style={styles.successMsg}>{successMsg}</Text> : null}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange} 
        style={styles.input}
      />
      {password ? (
        <Text style={styles.passwordStrength}>
          Password Strength: {passwordStrength}
        </Text>
      ) : null}
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  errorMsg: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  successMsg: {
    color: "green",
    marginBottom: 10,
    textAlign: "center",
  },
  passwordStrength: { 
    textAlign: "center",
    marginBottom: 10,
    color: "#555",
  },
});
