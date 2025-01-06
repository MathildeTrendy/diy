import { useContext, useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { MainContainer, StyledText, StyledButton, AlertModal } from "../components";
import { CartContext } from "../utils/context";
import { colors } from "../config/theme";
import { Feather } from "@expo/vector-icons";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0); // Subtotal uden gebyrer
  const [cartTotal, setCartTotal] = useState(0); // Total med gebyrer
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false); // Styrer modal
  const [checkoutDetails, setCheckoutDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
  });
  const [isSuccessVisible, setIsSuccessVisible] = useState(false); // Succesmodal

  const shippingCost = 49; // Fragtpris i DKK
  const serviceFee = 10; // Servicegebyr i DKK
  const vatRate = 0.25; // Momsrate på 25%

  const calculateTotals = () => {
    if (cartItems && cartItems.length > 0) {
      const calculatedSubtotal = cartItems.reduce(
        (accumulator, cartItem) =>
          accumulator + cartItem.price * cartItem.cartCount,
        0
      );
      setSubtotal(calculatedSubtotal);

      const vat = calculatedSubtotal * vatRate;
      const calculatedTotal = calculatedSubtotal + vat + shippingCost + serviceFee;
      setCartTotal(calculatedTotal);
    } else {
      setSubtotal(0);
      setCartTotal(0);
    }
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
    // Valider checkout felter
    const { fullName, address, city, postalCode, country, phone, email } = checkoutDetails;
    if (!fullName || !address || !city || !postalCode || !country || !phone || !email) {
      alert("Please fill in all fields!");
      return;
    }

    // Gennemfør betaling
    setIsCheckoutVisible(false);
    setIsSuccessVisible(true);
    setCartItems([]); // Tøm kurven
    setCheckoutDetails({
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      phone: "",
      email: "",
    }); // Nulstil felter
  };

  useEffect(() => {
    calculateTotals();
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
            onPress={() => setIsCheckoutVisible(true)}
          >
            Pay Now
          </StyledButton>
        </>
      )}

      {/* Checkout Modal */}
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
          <StyledText style={styles.modalText}>
            Shipping: {`${cartItems?.[0]?.currency || "DKK"}${shippingCost}`}
          </StyledText>
          <StyledText style={styles.modalText}>
            Service Fee: {`${cartItems?.[0]?.currency || "DKK"}${serviceFee}`}
          </StyledText>
          <StyledText style={styles.modalText}>
            VAT (25%): {`${cartItems?.[0]?.currency || "DKK"}${(subtotal * vatRate).toFixed(2)}`}
          </StyledText>
          <StyledText big style={styles.modalText}>
            Total: {`${cartItems?.[0]?.currency || "DKK"}${cartTotal.toFixed(2)}`}
          </StyledText>
          <StyledButton style={styles.modalPayButton} onPress={handlePay}>
            Pay
          </StyledButton>
        </ScrollView>
      </AlertModal>

      {/* Success Modal */}
      <AlertModal isVisible={isSuccessVisible} onClose={() => setIsSuccessVisible(false)}>
        <View style={styles.modalContent}>
          <Feather name="check-circle" size={50} color={colors.success} />
          <StyledText big style={styles.modalText}>
            Payment Successful!
          </StyledText>
          <StyledButton style={styles.modalPayButton} onPress={() => setIsSuccessVisible(false)}>
            OK
          </StyledButton>
        </View>
      </AlertModal>
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
  placeholder: {
    width: 60,
    height: 60,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
  },
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
  quantityText: {
    color: "black",
  },
  deleteButton: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  totalContainer: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  payButton: {
    marginTop: 20,
    backgroundColor: colors.metallic + "cc",
    paddingVertical: 10,
    borderRadius: 5,
  },
  modalContent: {
    padding: 20,
  },
  modalText: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
  modalPayButton: {
    backgroundColor: colors.metallic + "cc",
    width: "100%",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default Cart;
