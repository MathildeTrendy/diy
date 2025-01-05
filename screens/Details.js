import React, { useContext } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollableMainContainer, StyledText, ProductInfo } from "../components";
import { colors } from "../config/theme";
import { AntDesign } from "@expo/vector-icons";
import { SavedProductsContext } from "../utils/context";
import { storeData } from "../utils/storage";

const Details = ({ route }) => {
  // Modtag produktet, som blev sendt fra ProductCard eller DisplayCard
  const { item } = route.params;

  // Hvis item mod forventning skulle være undefined, undgå fejl:
  if (!item) {
    return (
      <ScrollableMainContainer>
        <StyledText>No item data available!</StyledText>
      </ScrollableMainContainer>
    );
  }

  const { savedProducts, setSavedProducts } = useContext(SavedProductsContext);
  const isSaved = savedProducts?.some((savedProduct) => savedProduct.id === item.id);

  // Funktion til at gemme/fjerne produkt fra favoritter
  const handleSaveProduct = async () => {
    try {
      let updatedSavedProducts;

      if (!isSaved) {
        updatedSavedProducts = [...(savedProducts || []), item];
      } else {
        updatedSavedProducts = (savedProducts || []).filter(
          (savedProduct) => savedProduct.id !== item.id
        );
      }

      await storeData("@DiyApp:SavedProducts", updatedSavedProducts);
      setSavedProducts(updatedSavedProducts);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <ScrollableMainContainer contentContainerStyle={styles.container}>
      <View style={styles.topSection}>
        {/* Title */}
        <StyledText bold style={styles.title}>
          {item.title}
        </StyledText>

        {/* Image (vises under titlen) */}
        {item.image && (
          <Image
            // Tjekker om item.image er et "number" (lokal require)
            // eller en string (URL), så billedet altid vises korrekt
            source={
              typeof item.image === "number"
                ? item.image
                : { uri: item.image }
            }
            style={styles.image}
          />
        )}

        {/* Price */}
        <StyledText style={styles.price} bold>
          {item.price} DKK
        </StyledText>

        {/* Heart (Gem/Fjern fra favoritter) */}
        <TouchableOpacity style={styles.heart} onPress={handleSaveProduct}>
          <AntDesign
            name={isSaved ? "heart" : "hearto"}
            size={27}
            color={colors.darkred + "cc"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSection}>
        {/* Description */}
        <ProductInfo label="Description" style={styles.info}>
          {item.description || "No description provided"}
        </ProductInfo>

        {/* Homepage URL */}
        <ProductInfo label="Homepage URL" style={styles.info}>
          {item.homepageUrl || "No URL provided"}
        </ProductInfo>
      </View>
    </ScrollableMainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
  },
  topSection: {
    paddingHorizontal: 25,
    paddingBottom: 25,
    backgroundColor: colors.secondary,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  bottomSection: {
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  title: {
    marginBottom: 20,
    fontSize: 30,
  },
  price: {
    marginBottom: 20,
    fontSize: 24,
    color: colors.darkred,
  },
  info: {
    marginVertical: 10,
  },
  heart: {
    position: "absolute",
    bottom: -20,
    right: "50%",
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 50,
    borderColor: colors.darkred,
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
});

export default Details;
