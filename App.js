import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import RootTabs from "./navigators/RootTabs";
import OnboardingStack from "./navigators/OnboardingStack";
import { OnboardingContext, CartContext } from "./utils/context";
import { getData } from "./utils/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isDiyAppOnboarded, setIsDiyAppOnboarded] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const prepareApp = async () => {
    try {
      //fetch all needed data
      const onboardingStatus = await getData("@DiyApp:Onboarding");
      const cartItemsData = await getData("@WineApp:CartItems");

      onboardingStatus && setIsDiyAppOnboarded(onboardingStatus);
      cartItemsData && setCartItems(cartItemsData);
    } catch (error) {
      console.warn(error);
    } finally {
      SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    prepareApp();
  }, []);

  return (
    <OnboardingContext.Provider
      value={{ isDiyAppOnboarded, setIsDiyAppOnboarded }}
    >
      <CartContext.Provider value={{ cartItems, setCartItems }}>
        <NavigationContainer>
          {isDiyAppOnboarded ? <RootTabs /> : <OnboardingStack />}
          <StatusBar style="auto" />
        </NavigationContainer>
      </CartContext.Provider>
    </OnboardingContext.Provider>
  ); //checker om diyapp er onboarded return homescreen eller onboardingstack
}
