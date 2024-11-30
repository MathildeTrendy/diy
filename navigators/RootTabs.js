import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens";
import { colors } from "../config/theme";
import { StatusBar } from "expo-status-bar";
import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useEffect } from "react";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

const RootTabs = () => {
  useEffect(() => {}, []);

  return (
    <>
      <StatusBar style="light" backgroundColor={colors?.primary} />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: colors?.primary,
            borderTopColor: colors?.secondary,
            borderTopWidth: 2,
            height: 60,
          },
          tabBarItemStyle: {
            paddingVertical: 5,
          },
          tabBarInactiveTintColor: colors?.tertiary + "cc",
          tabBarActiveTintColor: colors?.accent + "cc",
          tabBarIcon: ({ size, color }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
              return (
                <AntDesign name={iconName} size={size + 2} color={color} />
              );
            } else if (route.name === "Search") {
              iconName = "search";
            } else if (route.name === "Cart") {
              iconName = "shopping-cart";
            } else if (route.name === "Profile") {
              iconName = "user";
            }

            return <Feather name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Search" component={Home} />
        <Tab.Screen name="Cart" component={Home} />
        <Tab.Screen name="Profile" component={Home} />
      </Tab.Navigator>
    </>
  );
};

export default RootTabs;
