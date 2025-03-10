import { createStackNavigator } from "@react-navigation/stack";
import { Details, Products } from "../screens";
import { colors } from "../config/theme";
import { onIOS } from "../config/constants";
import { Feather } from "@expo/vector-icons";

const Stack = createStackNavigator();

const SearchStack = () => {
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
          shadowOpacity: 0.5,
        },
      }}
      initialRouteName="SearchScreen"
    >
      <Stack.Screen
        name="SearchScreen"
        component={Products}
        options={{ title: "Search" }}
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
            shadowOpacity: 0.5,
          },
        }}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options={{ title: "My Collection" }}
      />
      <Stack.Screen name="Popular" component={Products} />
    </Stack.Navigator>
  );
};

export default SearchStack;
