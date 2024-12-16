import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import RootTabs from "./navigators/RootTabs";
import OnboardingStack from "./navigators/OnboardingStack";
import { OnboardingContext, CartContext, UserContext } from "./utils/context";
import { getData } from "./utils/storage";
import firebase from "firebase/app";
import "firebase/auth";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isDiyAppOnboarded, setIsDiyAppOnboarded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [activeUser, setActiveUser] = useState({
      username: "Michael McDonald",
      email: "michael.mc@ymail.com",
      address: "Øst 8, København" 
  
  });

  const prepareApp = async () => {
    try {
      //fetch all needed data
      const onboardingStatus = await getData("@DiyApp:Onboarding");
      const cartItemsData = await getData("@DiyApp:CartItems");

      onboardingStatus && setIsDiyAppOnboarded(onboardingStatus == "true");
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
        <UserContext.Provider value={{activeUser, setActiveUser}}>

        <NavigationContainer>
          {isDiyAppOnboarded ? <RootTabs /> : <OnboardingStack />}
          <StatusBar style="auto" />
        </NavigationContainer>
        </UserContext.Provider>
      </CartContext.Provider>
    </OnboardingContext.Provider>
  ); //checker om diyapp er onboarded return homescreen eller onboardingstack
}
