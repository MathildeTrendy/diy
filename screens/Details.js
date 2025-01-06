import { useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import { CartContext } from "../utils/context";
import { StyledButton, StyledText } from "../components";

const Details = ({ route }) => {
  const { addItemToCart } = useContext(CartContext);
  const item = route.params?.item;

  if (!item) {
    return (
      <View style={styles.container}>
        <StyledText big>Item not found!</StyledText>
      </View>
    );
  }

  const handleAddToCart = () => {
    addItemToCart(item);
  };

  return (
    <View style={styles.container}>
      {/* Viser billede */}
      {item.image && (
        <Image
          source={typeof item.image === "number" ? item.image : { uri: item.image }}
          style={styles.image}
        />
      )}
      {/* Viser titel, beskrivelse og pris */}
      <StyledText big>{item.title}</StyledText>
      <StyledText>{item.description}</StyledText>
      <StyledText>{`Price: ${item.currency || "DKK"}${item.price}`}</StyledText>
      {/* Knap til at tilføje til cart */}
      <StyledButton onPress={handleAddToCart} style={styles.addButton}>
        Add to Cart
      </StyledButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  addButton: {
    marginTop: 20,
  },
});

export default Details;
