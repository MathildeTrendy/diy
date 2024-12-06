import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import StyledText from "../Texts/StyledText";
import CartCounter from "../Inputs/CartCounter";
import { ScreenWidth } from "../../config/constants";
import { colors } from "../../config/theme";
import { AntDesign } from "@expo/vector-icons";

const CartCard = ({ image, name, volume, currency, price }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.nameRow}>
          <StyledText bold numberOfLines={2} style={styles.name}>
            {name}
          </StyledText>
          <TouchableOpacity style={styles.closeButton}>
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
          <CartCounter small />
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
