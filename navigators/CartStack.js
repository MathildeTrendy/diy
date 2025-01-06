import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Cart } from "../screens";
import { colors } from "../config/theme";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { CartContext } from "../utils/context";

const Stack = createStackNavigator();

const CartStack = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const clearCart = async () => {
    try {
      setCartItems([]); // Tømmer kurven
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: colors.tint,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerRightContainerStyle: {
          right: 15,
        },
      }}
    >
      <Stack.Screen
        name="CartScreen"
        component={Cart}
        options={{
          title: "Cart",
          headerRight: () =>
            cartItems.length > 0 && (
              <TouchableOpacity onPress={clearCart}>
                <Feather name="trash" size={22} color={colors.tertiary} />
              </TouchableOpacity>
            ),
        }}
      />
    </Stack.Navigator>
  );
};

export default CartStack;
