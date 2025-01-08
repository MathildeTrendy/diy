import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignUpScreen"; // Importer SignupScreen
import { colors } from "../config/theme";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: colors.tint,
        headerTransparent: true,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerTitle: "Login" }} 
      />
      <Stack.Screen 
        name="Signup" 
        component={SignupScreen} 
        options={{ headerTitle: "Sign Up" }} 
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
