import { createStackNavigator } from "@react-navigation/stack";
import { Home, Details, Products } from "../screens";
import { colors } from "../config/theme";
import { onIOS } from "../config/constants";
import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: colors.tint,
        headerBackImage: ({ tintColor }) => (
          <Feather name="chevron-left" size={35} color={tintColor} />
        ),
        headerLeftContainerStyle: {
          left: onIOS ? 22 : 12,
        },
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: colors.primary,
          borderBottomWidth: 0,
          elevation: 0,
          shadowColor: "transparent",
          shadowOpacity: 0,
        },
      }}
      initialRouteName="HomeScreen"
    >
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ title: "Diy App" }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.secondary,
            borderBottomWidth: 0,
            elevation: 0,
            shadowColor: "transparent",
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options={{ title: "Our Collection" }}
      />
      <Stack.Screen name="Popular" component={Products} />
    </Stack.Navigator>
  );
};

export default HomeStack;
