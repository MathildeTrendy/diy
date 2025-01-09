// OnboardingStack.js

import { useContext } from "react";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Welcome } from "../screens";
import { colors } from "../config/theme";
import { Feather } from "@expo/vector-icons";
import { onIOS } from "../config/constants";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import RootTabs from "./RootTabs";

const Stack = createStackNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        headerTintColor: colors.tint,
        headerTransparent: true,
        headerBackImage: ({ tintColor }) => (
          <Feather name="chevron-left" size={35} color={tintColor} />
        ),
        headerLeftContainerStyle: {
          left: onIOS ? 22 : 12,
        },
        headerBackTitleVisible: false,
      })}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen
        name="RootTabs"
        component={RootTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
