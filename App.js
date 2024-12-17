import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import RootTabs from "./navigators/RootTabs";
import OnboardingStack from "./navigators/OnboardingStack";
import { OnboardingContext, CartContext, UserContext, SavedProductsContext } from "./utils/context";
import { getData } from "./utils/storage";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "./config/firebase"; // Din firebase config
import { initializeApp } from "firebase/app";
import auth from '@react-native-firebase/auth'; // This is for React Native Firebase SDK


// Firebase setup
const app = initializeApp(firebaseConfig);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isDiyAppOnboarded, setIsDiyAppOnboarded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [SavedProducts, setSavedProducts] = useState([]);

  const prepareApp = async () => {
    try {
      //fetch all needed data
      const onboardingStatus = await getData("@DiyApp:Onboarding");
      const cartItemsData = await getData("@DiyApp:CartItems");
      const savedProductsData = await getData("@DiyApp:SavedProducts");

      onboardingStatus && setIsDiyAppOnboarded(onboardingStatus == "true");
      cartItemsData && setCartItems(cartItemsData);
      savedProductsData && setSavedProducts(savedProductsData)
    } catch (error) {
      console.warn(error);
    } finally {
      SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // If the user is logged in
          setActiveUser({
            username: user.displayName || "User",
            email: user.email,
            address: "Address not provided", // Example
          });
        } else {
          // If the user is not logged in
          setActiveUser(null);
        }
      });
    
      prepareApp();
    
      return () => unsubscribe();
    }, []);

  return (
    <OnboardingContext.Provider
      value={{ isDiyAppOnboarded, setIsDiyAppOnboarded }}
    >
      <CartContext.Provider value={{ cartItems, setCartItems }}>
       <SavedProductsContext.Provider value={{SavedProducts, setSavedProducts}} >
        
        <UserContext.Provider value={{activeUser, setActiveUser}}>

        <NavigationContainer>
          {isDiyAppOnboarded ? <RootTabs /> : <OnboardingStack />}
          <StatusBar style="auto" />
        </NavigationContainer>
        </UserContext.Provider>
        </SavedProductsContext.Provider>
      </CartContext.Provider>
    </OnboardingContext.Provider>
  ); //checker om diyapp er onboarded return homescreen eller onboardingstack
}
