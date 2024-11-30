import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import RootTabs from "./navigators/RootTabs";
import OnboardingStack from "./navigators/OnboardingStack";
import { OnboardingContext } from "./utils/context";
import { getData } from "./utils/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isWineAppOnboarded, setIsWineAppOnboarded] = useState(false);
  const prepareApp = async () => {
    try {
      AsyncStorage.removeItem("@WineApp:Onboarding");

      //fetch all needed data
      /*const onboardingStatus = await getData("@WineApp:Onboarding");

      onboardingStatus && setIsWineAppOnboarded(onboardingStatus);*/
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
      value={{ isWineAppOnboarded, setIsWineAppOnboarded }}
    >
      <NavigationContainer>
        {isWineAppOnboarded ? <RootTabs /> : <OnboardingStack />}
        <StatusBar style="auto" />
      </NavigationContainer>
    </OnboardingContext.Provider>
  ); //checker om wineapp er onboarded return homescreen eller onboardingstack
}
