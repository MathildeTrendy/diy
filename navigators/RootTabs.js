import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens";
import { colors } from "../config/theme";
import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useEffect } from "react";
import HomeStack from "./HomeStack";
import SearchStack from "./SearchStack";
import CartStack from "./CartStack";
import { CartContext } from "../utils/context";

const Tab = createBottomTabNavigator();

const RootTabs = () => {
  const {cartItems, setCartItems} = useContext(CartContext);

  useEffect(() => {}, []);

  return (
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
        tabBarActiveTintColor: colors?.metallic + "cc",
        tabBarIcon: ({ size, color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
            return <AntDesign name={iconName} size={size + 1} color={color} />;
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
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={
          cartItems.length > 0 && 
          {
          tabBarBadge:  cartItems.length,
          tabBarBadgeStyle: {
            backgroundColor: colors.amber,
            color: colors.primary,
          },
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen name="Profile" component={Home} />
    </Tab.Navigator>
  );
};

export default RootTabs;
