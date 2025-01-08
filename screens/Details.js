import React, { useContext, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { StyledText } from "../components";
import { colors } from "../config/theme";
import { CartContext } from "../utils/context";

const Details = ({ route }) => {
  const { addItemToCart } = useContext(CartContext);
  const item = route.params?.item;

  const [quantity, setQuantity] = useState(1);

  if (!item) {
    return (
      <View style={styles.container}>
        <StyledText big>Item not found!</StyledText>
      </View>
    );
  }

  const renderImage = ({ item }) => (
    <Image
      source={typeof item === "number" ? item : { uri: item }}
      style={styles.carouselImage}
    />
  );

  const handleAddToCart = () => {
    const itemToAdd = {
      ...item,
      cartCount: quantity,
    };
    addItemToCart(itemToAdd);
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Billedvisning */}
      {item.images && item.images.length > 0 ? (
        <FlatList
          data={item.images}
          renderItem={renderImage}
          horizontal
          keyExtractor={(image, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.carouselContainer}
        />
      ) : item.image ? (
        <Image
          source={typeof item.image === "number" ? item.image : { uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <StyledText style={styles.noImage}>No Image Available</StyledText>
      )}

      {/* Item detaljer */}
      <View style={styles.content}>
        <StyledText big style={styles.title}>
          {item.title || "Unnamed Item"}
        </StyledText>
        <StyledText style={styles.description}>
          {item.description || "No description available."}
        </StyledText>
        <StyledText style={styles.owner}>
          {`Owner: ${item.ownerUsername || "Unknown"}`}
        </StyledText>
        <StyledText bold style={styles.price}>
          {`Price: ${item.currency || "DKK"}${item.price.toFixed(2)}`}
        </StyledText>

        {/* Quantity kontrol */}
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <StyledText style={styles.quantityButtonText}>-</StyledText>
          </TouchableOpacity>
          <StyledText style={styles.quantityText}>{quantity}</StyledText>
          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <StyledText style={styles.quantityButtonText}>+</StyledText>
          </TouchableOpacity>
        </View>

        {/* Add to Cart knap */}
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <StyledText style={styles.cartButtonText}>Add to Cart</StyledText>
        </TouchableOpacity>
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
  carouselContainer: {
    marginBottom: 20,
  },
  carouselImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginRight: 10,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 350, // Mere plads til billedet
    resizeMode: "contain",
    marginBottom: 20,
  },
  noImage: {
    textAlign: "center",
    color: colors.secondaryText,
    fontSize: 18,
    marginBottom: 20,
  },
  content: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    color: colors.primaryText,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 22,
    color: colors.secondaryText,
  },
  owner: {
    fontSize: 12,
    marginTop: 10, // Giver afstand til beskrivelsen
    marginBottom: 5, // Mere afstand fra prisen
    color: colors.secondaryText,
  },
  price: {
    fontSize: 22,
    color: colors.accent,
    marginBottom: 20, // Giver mere luft under prisen
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    justifyContent: "center",
  },
  quantityButton: {
    backgroundColor: colors.metallic + "cc",
    width: 40, // Kvadratisk form
    height: 40, // Kvadratisk form
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primaryText,
  },
  cartButton: {
    backgroundColor: colors.metallic + "cc",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 60,
  },
  cartButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Details;
