import { FlatList, StyleSheet, View } from "react-native";
import { MainContainer, StyledText, StyledButton } from "../components";
import { getDiyData } from "../config/data";
import { CartCard } from "../components";
import { colors } from "../config/theme";
import { Feather } from "@expo/vector-icons";
import { ScreenWidth } from "../config/constants";

const Cart = () => {
  const cartItems = getDiyData({});

  return (
    <MainContainer style={styles.container}>
      {cartItems.length <= 0 && <View style={styles.emptyCart}></View>}

      {cartItems.length > 0 && (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => <CartCard {...item} />}
            showVerticalScrollIndicator={false}
          />

          <View style={styles.divider} />

          <View style={styles.checkoutRow}>
            <StyledText big style={styles.totalAmount}>
              $1234
            </StyledText>
            <StyledButton style={styles.checkoutButton}>Checkout</StyledButton>
          </View>
        </>
      )}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 25,
  },
  divider: {
    height: 1,
    backgroundColor: colors.secondary,
    marginVertical: 1,
  },
  checkoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  totalAmount: {
    width: "40%",
    color: colors.darkred + "cc",
  },
  checkoutButton: {
    width: "50%",
  },
});

export default Cart;
