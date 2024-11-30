import { useContext, useState } from "react";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Welcome } from "../screens";
import { colors } from "../config/theme";
import { StyledButton } from "../components";
import { Feather } from "@expo/vector-icons";
import { onIOS } from "../config/constants";
import { OnboardingContext } from "../utils/context";
import { storeData } from "../utils/storage";

const Stack = createStackNavigator();

const OnboardingStack = () => {
  const { setIsWineAppOnboarded } = useContext(OnboardingContext);
  const [completingOnboarding, setCompletingOnboarding] = useState(false);

  const completeOnBoarding = async () => {
    try {
      setCompletingOnboarding(true);
      await storeData("@WineApp:Onboarding", true);

      setIsWineAppOnboarded(true);
    } catch (error) {
      console.warn(error);
    } finally {
      setCompletingOnboarding(false); //hvis fejl, sætter vi denne
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: colors.tint,
        headerRight: () => (
          <StyledButton
            onPress={completeOnBoarding}
            isLoading={completingOnboarding}
            style={{
              height: "auto",
              width: "auto",
              padding: 10,
              backgroundColor: "transparent",
            }}
            textStyle={{
              color: "black",
              fontSize: 14,
              fontWeight: "normal",
            }}
          >
            Skip
          </StyledButton>
        ),
        headerRightContainerStyle: {
          right: 25,
        },
        headerTransparent: true,
        headerBackImage: ({ tintColor }) => (
          <Feather name="chevron-left" size={35} color={tintColor} />
        ),
        headerLeftContainerStyle: {
          left: onIOS ? 22 : 12,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;