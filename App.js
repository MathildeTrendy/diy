import { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Home, Welcome } from "./screens";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();


export default function App() {
  const prepareApp = async () => {
    try {
      // Fetch all needed data

    } catch (error) {
      console.warn(error);
    } finally {
      SplashScreen.hideAsync(); 
  }
};

useEffect(() => {
 prepareApp();
},[])
  
  return (
    <NavigationContainer>
      <Welcome />
   <StatusBar style="auto" />
    </NavigationContainer>
  );
}
