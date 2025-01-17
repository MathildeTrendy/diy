import { useContext, useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { MainContainer, StyledText, StyledButton, AlertModal } from "../components";
import { CartContext } from "../utils/context";
import { colors } from "../config/theme";
import { Feather } from "@expo/vector-icons";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const [checkoutDetails, setCheckoutDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const shippingCost = 49; // Fragtpris i DKK
  const serviceFee = 10; // Servicegebyr i DKK

  const calculateSubtotal = () => {
    if (cartItems && cartItems.length > 0) {
      const calculatedSubtotal = cartItems.reduce(
        (accumulator, cartItem) =>
          accumulator + cartItem.price * cartItem.cartCount,
        0
      );
      setSubtotal(calculatedSubtotal);
    } else {
      setSubtotal(0);
    }
  };

  const calculateCartTotal = () => {
    const total = subtotal + shippingCost + serviceFee;
    setCartTotal(total);
  };

  const adjustQuantity = (id, amount) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        const newCount = Math.max(item.cartCount + amount, 1);
        return { ...item, cartCount: newCount };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const removeItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const handlePay = () => {
    const { fullName, address, city, postalCode, country, phone, email, cardNumber, expiryDate, cvv } = checkoutDetails;

    if (!fullName || !address || !city || !postalCode || !country || !phone || !email || !cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all fields!");
      return;
    }

    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
      alert("Invalid card number. It must be 16 digits.");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      alert("Invalid expiry date. Use format MM/YY.");
      return;
    }

    if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
      alert("Invalid CVV. It must be 3 digits.");
      return;
    }

    setIsCheckoutVisible(false);
    setIsSuccessVisible(true);
    setCartItems([]);
    setCheckoutDetails({
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      phone: "",
      email: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
  };

  useEffect(() => {
    calculateSubtotal();
  }, [cartItems]);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      {item.image ? (
        <Image
          source={typeof item.image === "number" ? item.image : { uri: item.image }}
          style={styles.itemImage}
        />
      ) : (
        <View style={styles.placeholder}>
          <StyledText>No Image</StyledText>
        </View>
      )}
      <View style={styles.itemDetails}>
        <StyledText big>{item.title || "Unnamed Item"}</StyledText>
        <StyledText>{`${item.currency || "DKK"}${item.price.toFixed(2)}`}</StyledText>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() => adjustQuantity(item.id, -1)}
            style={styles.quantityButton}
          >
            <Feather name="minus" size={20} color={colors.primary} />
          </TouchableOpacity>
          <StyledText style={styles.quantityText}>{item.cartCount}</StyledText>
          <TouchableOpacity
            onPress={() => adjustQuantity(item.id, 1)}
            style={styles.quantityButton}
          >
            <Feather name="plus" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteButton}>
        <Feather name="trash" size={20} color={colors.error || "#FF0000"} />
      </TouchableOpacity>
    </View>
  );

  return (
    <MainContainer style={styles.container}>
      {cartItems && cartItems.length === 0 ? (
        <StyledText big>Your cart is empty!</StyledText>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCartItem}
          />
          <View style={styles.totalContainer}>
            <StyledText big>{`Subtotal: ${cartItems?.[0]?.currency || "DKK"}${subtotal.toFixed(2)}`}</StyledText>
          </View>
          <StyledButton
            style={styles.payButton}
            onPress={() => {
              calculateCartTotal();
              setIsCheckoutVisible(true);
            }}
          >
            Pay Now
          </StyledButton>
        </>
      )}

      <AlertModal isVisible={isCheckoutVisible} onClose={() => setIsCheckoutVisible(false)}>
        <ScrollView contentContainerStyle={styles.modalContent}>
          <StyledText big>Checkout</StyledText>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={checkoutDetails.fullName}
            onChangeText={(text) => setCheckoutDetails({ ...checkoutDetails, fullName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={checkoutDetails.address}
            onChangeText={(text) => setCheckoutDetails({ ...checkoutDetails, address: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={checkoutDetails.city}
            onChangeText={(text) => setCheckoutDetails({ ...checkoutDetails, city: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Postal Code"
            keyboardType="numeric"
            value={checkoutDetails.postalCode}
            onChangeText={(text) => setCheckoutDetails({ ...checkoutDetails, postalCode: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Country"
            value={checkoutDetails.country}
            onChangeText={(text) => setCheckoutDetails({ ...checkoutDetails, country: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            keyboardType="phone-pad"
            value={checkoutDetails.phone}
            onChangeText={(text) => setCheckoutDetails({ ...checkoutDetails, phone: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={checkoutDetails.email}
            onChangeText={(text) => setCheckoutDetails({ ...checkoutDetails, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            keyboardType="numeric"
            maxLength={16}
            value={checkoutDetails.cardNumber}
            onChangeText={(text) => setCheckoutDetails({ ...checkoutDetails, cardNumber: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Expiry Date (MM/YY)"
            value={checkoutDetails.expiryDate}
            onChangeText={(text) => setCheckoutDetails({ ...checkoutDetails, expiryDate: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="CVV"
            keyboardType="numeric"
            maxLength={3}
            value={checkoutDetails.cvv}
            onChangeText={(text) => setCheckoutDetails({ ...checkoutDetails, cvv: text })}
          />
          <StyledText>{`Shipping: ${cartItems?.[0]?.currency || "DKK"}${shippingCost}`}</StyledText>
          <StyledText>{`Service Fee: ${cartItems?.[0]?.currency || "DKK"}${serviceFee}`}</StyledText>
          <StyledText bold>{`Total: ${cartItems?.[0]?.currency || "DKK"}${cartTotal.toFixed(2)}`}</StyledText>
          <StyledButton style={styles.modalPayButton} onPress={handlePay}>
            Confirm Payment
          </StyledButton>
        </ScrollView>
      </AlertModal>

      <AlertModal isVisible={isSuccessVisible} onClose={() => setIsSuccessVisible(false)}>
        <View style={styles.modalContent}>
          <Feather name="check-circle" size={50} color={colors.success} />
          <StyledText big>Payment Successful!</StyledText>
          <StyledButton style={styles.modalPayButton} onPress={() => setIsSuccessVisible(false)}>
            OK
          </StyledButton>
        </View>
      </AlertModal>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: colors.secondary,
    paddingBottom: 10,
  },
  itemImage: { width: 60, height: 60, marginRight: 10 },
  placeholder: {
    width: 60,
    height: 60,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  itemDetails: { flex: 1 },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.metallic + "cc",
    marginHorizontal: 5,
  },
  quantityText: { color: "black" },
  deleteButton: { padding: 5, alignItems: "center", justifyContent: "center" },
  totalContainer: { marginTop: 20, alignItems: "flex-end" },
  payButton: {
    marginTop: 20,
    backgroundColor: colors.metallic + "cc",
    paddingVertical: 10,
    borderRadius: 5,
  },
  modalContent: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalPayButton: {
    marginTop: 20,
    backgroundColor: colors.metallic + "cc",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default Cart;
