import { useContext, useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { MainContainer, StyledText, StyledButton } from "../components";
import { CartCard } from "../components";
import { colors } from "../config/theme";
import { Feather } from "@expo/vector-icons";
import { ScreenWidth } from "../config/constants";
import { CartContext } from "../utils/context";
import { storeData } from "../utils/storage";

const Cart = () => {
  const {cartItems, setCartItems} = useContext(CartContext);
  const [cartTotal, setCartTotal] = useState(0);

  const calculateCartTotal = () => {
    if(cartItems.length > 0) {
      const cartTotal = cartItems.reduce((accumulator, cartItem ) => {
        return accumulator + cartItem.price * cartItem.cartCount;
      }, 0);
      setCartTotal(cartTotal);
    }
  };

  useEffect(() => {
    calculateCartTotal();
  }, [cartItems]);

  const checkOut = () => {
    alert (`Check out: $${cartTotal}`);
    clearCart();
  }

  const clearCart = async () => {
    try {
      storeData("@DiyApp:CartItems", []);
      setCartItems([]);
    } catch (error) {
      console.warn(error);
      
    }
  };

  return (
    <MainContainer style={styles.container}>
      {cartItems.length <= 0 && (
        <View style={styles.emptyCart}>
          <Feather
            name="shopping-cart"
            size={ScreenWidth * 0.4}
            color={colors.tertiary}
            style={{ marginBottom: 50 }}
          />

          <StyledText big>Your cart is empty!</StyledText>
          <StyledText style={styles.emptyCartText}>
            No items found in your cart
          </StyledText>
        </View>
      )}

      {cartItems.length > 0 && (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => 
            <CartCard id={item.id} 
            {...item} />}
            showVerticalScrollIndicator={false}
          />

          <View style={styles.divider} />

          <View style={styles.checkoutRow}>
            <StyledText big style={styles.totalAmount}>
              {`$${cartTotal}`}
            </StyledText>
            <StyledButton style={styles.checkoutButton}onPress={checkOut} >Checkout</StyledButton>
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
  emptyCart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCartText: {
    color: colors.tertiary,
    marginTop: 5,
  },
});

export default Cart;
