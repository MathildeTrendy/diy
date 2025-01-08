import { useContext } from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import StyledText from "../Texts/StyledText";
import CartCounter from "../Inputs/CartCounter";
import { ScreenWidth } from "../../config/constants";
import { colors } from "../../config/theme";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../../utils/context";
import { storeData } from "../../utils/storage";

const CartCard = ({ id, image, name, volume, currency, price, cartCount, quantityAvailable }) => {
  const navigation = useNavigation();
  const { cartItems, setCartItems } = useContext(CartContext);

  const handleOnPress = () => {
    navigation.navigate("Details", { id });
  };

  const handleAddToCart = (newCount) => {
    try {
      if (newCount > 0) {
        const updatedCartItems = cartItems.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, cartCount: newCount }
            : cartItem
        );

        saveCartItems(updatedCartItems);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const saveCartItems = async (updatedCartItems) => {
    try {
      await storeData("@DiyApp:CartItems", updatedCartItems);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      console.log("Cart before removal:", cartItems);
      console.log("Item to remove:", id);

      let updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== id
      );

      console.log("Cart after removal:", updatedCartItems);

      await saveCartItems(updatedCartItems);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <Image source={image} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.nameRow}>
          <StyledText bold numberOfLines={2} style={styles.name}>
            {name}
          </StyledText>
          <TouchableOpacity style={styles.closeButton} onPress={handleRemoveFromCart}>
            <AntDesign name="close" size={22} color={colors.tertiary + "cc"} />
          </TouchableOpacity>
        </View>

        <StyledText small style={styles.volume}>
          {volume}
        </StyledText>

        <View style={styles.priceRow}>
          <StyledText bold style={styles.price}>
            {currency + price}
          </StyledText>
          <CartCounter
            small
            count={cartCount}
            setCount={(newCount) => handleAddToCart(newCount)}
            limit={quantityAvailable}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ScreenWidth * 0.45,
    minHeight: 220,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: colors.secondary,
    padding: 10,
  },
  image: {
    width: "20%",
    height: "70%",
    resizeMode: "contain",
  },
  details: {
    width: "75%",
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  name: {
    width: "70%",
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "flex-end",
  },
  volume: {
    color: colors.tertiary,
    marginBottom: 15,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    color: colors.darkred + "cc",
  },
});

export default CartCard;
