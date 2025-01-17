import React, { useState } from "react";
import { 
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require("../assets/diy/retrove.png")} 
        style={styles.logo} 
      />

      {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity
        onPress={() => navigation.navigate("Signup")} 
        style={styles.signupLink}
      >
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
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  logo: {
    width: 200,
    height: 200,
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
    backgroundColor: "white",
  },
  signupLink: {
    marginTop: 20,
  },
  signupText: {
    color: "blue",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
