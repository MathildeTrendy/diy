import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import RootTabs from "./navigators/RootTabs";
import OnboardingStack from "./navigators/OnboardingStack";
import {
  OnboardingContext,
  CartContext,
  UserContext,
  SavedProductsContext,
} from "./utils/context";
import { getData } from "./utils/storage";
import { StripeProvider } from "@stripe/stripe-react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isDiyAppOnboarded, setIsDiyAppOnboarded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [SavedProducts, setSavedProducts] = useState([]);
  
  
  //Hardcoded publishableKey for development
  const publishableKey = "pk_test_YOUR_PUBLISHABLE_KEY"; // Replace with your actual key

  const prepareApp = async () => {
    try {
      // Hent nødvendige data
      const onboardingStatus = await getData("@DiyApp:Onboarding");
      const cartItemsData = await getData("@DiyApp:CartItems");
      const savedProductsData = await getData("@DiyApp:SavedProducts");

      onboardingStatus && setIsDiyAppOnboarded(onboardingStatus == "true");
      cartItemsData && setCartItems(cartItemsData);
      savedProductsData && setSavedProducts(savedProductsData);

      /*// Hent Stripe nøgle fra serveren
      const key = await fetchKey(); // Tilpas denne funktion til at hente din nøgle fra serveren
      setPublishableKey(key);*/
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
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier" // Krævet for Apple Pay
      urlScheme="retrove" // Krævet for 3D Secure og bank redirects
    >
      <OnboardingContext.Provider
        value={{ isDiyAppOnboarded, setIsDiyAppOnboarded }}
      >
        <CartContext.Provider value={{ cartItems, setCartItems }}>
          <SavedProductsContext.Provider
            value={{ SavedProducts, setSavedProducts }}
          >
            <UserContext.Provider value={{ activeUser, setActiveUser }}>
              <NavigationContainer>
                {isDiyAppOnboarded ? <RootTabs /> : <OnboardingStack />}
                <StatusBar style="auto" />
              </NavigationContainer>
            </UserContext.Provider>
          </SavedProductsContext.Provider>
        </CartContext.Provider>
      </OnboardingContext.Provider>
    </StripeProvider>
  ); // Checker om diyapp er onboarded og returnerer HomeScreen eller OnboardingStack
}

/*// Tilføj denne funktion til at hente publishable key fra serveren
const fetchKey = async () => {
  try {
    const response = await fetch("https://your-server.com/get-publishable-key");
    const { key } = await response.json();
    return key;
  } catch (error) {
    console.error("Error fetching publishable key:", error);
    return "";
  }
};*/

