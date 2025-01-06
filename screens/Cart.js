import { useContext, useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Image, Alert } from "react-native";
import { MainContainer, StyledText, StyledButton } from "../components";
import { CartContext } from "../utils/context";
import { colors } from "../config/theme";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [cartTotal, setCartTotal] = useState(0);

  const calculateCartTotal = () => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce(
        (accumulator, cartItem) =>
          accumulator + cartItem.price * cartItem.cartCount,
        0
      );
      setCartTotal(total);
    }
  };

  useEffect(() => {
    calculateCartTotal();
  }, [cartItems]);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Cart is empty", "Please add items to your cart before paying.");
      return;
    }

    Alert.alert(
      "Checkout",
      `You are about to pay ${cartItems[0].currency || "DKK"}${cartTotal.toFixed(
        2
      )}. Do you want to proceed?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Pay",
          onPress: () => {
            completePayment();
          },
        },
      ]
    );
  };

  const completePayment = async () => {
    // Simulerer en betalingsproces
    Alert.alert("Payment Successful", "Thank you for your purchase!");
    setCartItems([]); // Tømmer kurven
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      {/* Viser billede */}
      <Image
        source={typeof item.image === "number" ? item.image : { uri: item.image }}
        style={styles.itemImage}
      />
      {/* Viser navn og pris */}
      <View style={styles.itemDetails}>
        <StyledText big>{item.title || "Unnamed Item"}</StyledText>
        <StyledText>{`${item.currency || "DKK"}${item.price.toFixed(2)}`}</StyledText>
        <StyledText small>{`Quantity: ${item.cartCount}`}</StyledText>
      </View>
    </View>
  );

  return (
    <MainContainer style={styles.container}>
      {cartItems.length === 0 ? (
        <StyledText big>Your cart is empty!</StyledText>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCartItem}
          />
          <View style={styles.totalContainer}>
            <StyledText big>{`Total: ${cartItems[0]?.currency || "DKK"}${cartTotal.toFixed(2)}`}</StyledText>
          </View>
          {/* Pay-knap */}
          <StyledButton style={styles.payButton} onPress={handleCheckout}>
            Pay Now
          </StyledButton>
        </>
      )}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: colors.secondary,
    paddingBottom: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  payButton: {
    marginTop: 20,
    backgroundColor: colors.green,
    padding: 15,
    borderRadius: 5,
  },
});

export default Cart;
