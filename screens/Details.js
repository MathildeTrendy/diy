import { useContext, useState } from "react";
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { CartContext } from "../utils/context";
import { StyledButton, StyledText } from "../components";
import { colors } from "../config/theme";
import { Feather } from "@expo/vector-icons";

const Details = ({ route }) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const item = route.params?.item;
  const [quantity, setQuantity] = useState(1); // Holder styr på mængden

  if (!item) {
    return (
      <View style={styles.container}>
        <StyledText big>Item not found!</StyledText>
      </View>
    );
  }

  const handleAddToCart = () => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // Hvis varen allerede findes i kurven, opdater mængden
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, cartCount: cartItem.cartCount + quantity }
          : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      // Tilføj varen som ny post
      setCartItems([...cartItems, { ...item, cartCount: quantity }]);
    }
    setQuantity(1); // Nulstil mængden på Details-siden
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {item.image ? (
        <Image
          source={typeof item.image === "number" ? item.image : { uri: item.image }}
          style={styles.image}
        />
      ) : (
        <View style={styles.placeholder}>
          <StyledText>No Image Available</StyledText>
        </View>
      )}
      <View style={styles.content}>
        <StyledText big style={styles.title}>
          {item.title || "Unnamed Item"}
        </StyledText>
        <StyledText style={styles.description}>
          {item.description || "No description available."}
        </StyledText>
        <StyledText bold style={styles.price}>
          {`Price: ${item.currency || "DKK"}${item.price.toFixed(2)}`}
        </StyledText>
        {/* Mængdekontrol */}
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <Feather name="minus" size={20} color={colors.primary} />
          </TouchableOpacity>
          <StyledText style={styles.quantityText}>{quantity}</StyledText>
          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <Feather name="plus" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <StyledButton onPress={handleAddToCart} style={styles.addButton}>
          Add to Cart
        </StyledButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "contain",
    marginBottom: 20,
  },
  placeholder: {
    width: "100%",
    height: 350,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  content: {
    width: "100%",
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    color: colors.primaryText,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "justify",
    lineHeight: 28,
    color: colors.secondaryText,
  },
  price: {
    fontSize: 20,
    color: colors.accent,
    marginBottom: 30,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "flex-start",
  },
  quantityButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.metallic + "cc",
    marginHorizontal: 10,
  },
  quantityText: {
    color: "black",
  },
  addButton: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: colors.metallic + "cc",
    borderRadius: 8,
    alignItems: "center",
  },
});

export default Details;
