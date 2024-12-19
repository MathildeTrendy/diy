import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import RootTabs from "./navigators/RootTabs";
import OnboardingStack from "./navigators/OnboardingStack";
import AuthStack from "./navigators/AuthStack";
import { OnboardingContext, CartContext, UserContext, SavedProductsContext } from "./utils/context";
import { getData } from "./utils/storage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isDiyAppOnboarded, setIsDiyAppOnboarded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [SavedProducts, setSavedProducts] = useState([]);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const loadUserData = async (user) => {
    if (user) {
      const userOnboardingKey = `@DiyApp:Onboarding:${user.uid}`;
      const userOnboardingStatus = await getData(userOnboardingKey);
      setIsDiyAppOnboarded(userOnboardingStatus === "true");
    } else {
      setIsDiyAppOnboarded(false);
    }
  };

  const prepareApp = async () => {
    try {
      const cartItemsData = await getData("@DiyApp:CartItems");
      const savedProductsData = await getData("@DiyApp:SavedProducts");
      if (cartItemsData) setCartItems(cartItemsData);
      if (savedProductsData) setSavedProducts(savedProductsData);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    prepareApp();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setActiveUser(user || null);
      await loadUserData(user);
      setIsAuthChecked(true);
      SplashScreen.hideAsync();
    });

    return () => unsubscribe();
  }, []);

  if (!isAuthChecked) return null;

  return (
    <OnboardingContext.Provider value={{ isDiyAppOnboarded, setIsDiyAppOnboarded }}>
      <CartContext.Provider value={{ cartItems, setCartItems }}>
        <SavedProductsContext.Provider value={{ SavedProducts, setSavedProducts }}>
          <UserContext.Provider value={{ activeUser, setActiveUser }}>
            <NavigationContainer>
              {!activeUser ? (
                <AuthStack />
              ) : isDiyAppOnboarded ? (
                <RootTabs />
              ) : (
                <OnboardingStack />
              )}
              <StatusBar style="auto" />
            </NavigationContainer>
          </UserContext.Provider>
        </SavedProductsContext.Provider>
      </CartContext.Provider>
    </OnboardingContext.Provider>
  );
}
