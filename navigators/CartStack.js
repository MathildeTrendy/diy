import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Details, Products, Cart } from "../screens";
import { colors } from "../config/theme";
import { onIOS } from "../config/constants";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { CartContext } from "../utils/context";
import { storeData } from "../utils/storage";



const Stack = createStackNavigator();

const CartStack = () => {
  const {cartItems, setCartItems} = useContext(CartContext);


  const clearCart = async () => {
    try {
      storeData("@DiyApp:CartItems", []);
      setCartItems([]);
    } catch (error) {
      console.warn(error);
      
    }
  };

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
      initialRouteName="CartScreen"
    >
      <Stack.Screen
        name="CartScreen"
        component={Cart}
        options={{
          title: "Cart",
          headerRight: () => (
            <>
            {cartItems.length > 0 && 
            <TouchableOpacity onPress={clearCart} style={{padding: 10}}>
              <Feather name="trash" size={20} color={colors.tertiary + "cc"} />
            </TouchableOpacity>}
            </>
          ),
          headerRightContainerStyle: {
            //push icon away from the screen
            right: 15,
          },
        }}
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

export default CartStack;
