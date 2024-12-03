import { useState, useEffect } from "react"; //hook ??
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  ScrollableMainContainer,
  StyledText,
  ProductInfo,
  StyledButton,
  CartCounter,
} from "../components";
import { getDiyData } from "../config/data";
import { colors } from "../config/theme";
import { AntDesign } from "@expo/vector-icons";

const Details = ({ route }) => {
  const diyId = route.params?.id;
  const [fetchedDiy, setFetchedDiy] = useState();
  const [addedToCart, setAddedToCart] = useState(false);

  const fetchDiyDetails = () => {
    try {
      const diyData = getDiyData({ diyId })[0];
      setFetchedDiy(diyData);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetchDiyDetails();
  }, []);

  return (
    <ScrollableMainContainer contentContainerStyle={styles.container}>
      <View style={styles.topSection}>
        <StyledText bold style={styles.name}>
          {fetchedDiy?.name}
        </StyledText>

        <ProductInfo label="Alcohol" style={styles.info}>
          {fetchedDiy?.alcohol + "%"}
        </ProductInfo>
        <ProductInfo label="Volume" style={styles.info}>
          {fetchedDiy?.volume}
        </ProductInfo>
        <ProductInfo label="Year" style={styles.info}>
          {fetchedDiy?.year}
        </ProductInfo>
        <ProductInfo label="Origin" style={styles.info}>
          {fetchedDiy?.origin}
        </ProductInfo>
        <StyledText big>{fetchedDiy?.currency + fetchedDiy?.price}</StyledText>
        <TouchableOpacity style={styles.heart}>
          <AntDesign
            name="hearto"
            size={27}
            color={colors.tertiary + "cc"}
          ></AntDesign>
        </TouchableOpacity>
        <Image source={fetchedDiy?.image} style={styles.image} />
      </View>

      <View style={styles.bottomSection}>
        <ProductInfo label={"Description"} style={styles.info}>
          {fetchedDiy?.description}
        </ProductInfo>
        <View style={styles.cartRow}>
          {!addedToCart && (
            <StyledButton icon="shoppingcart">Add to cart</StyledButton>
          )}
          {addedToCart && (
            <>
              <StyledButton
                icon="delete"
                style={styles.removeButton}
                textStyle={styles.removeButtonText}
              >
                Remove
              </StyledButton>
              <CartCounter style={styles.CartCounter} />
            </>
          )}
        </View>
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
    borderBottomRightRadius: 15,
  },
  name: {
    marginBottom: 30,
    fontsize: 30,
  },
  info: {
    margin: 15,
  },
  heart: {
    backgroundColor: colors.primary,
    position: "absolute",
    bottom: -20,
    right: "50%",
    padding: 10,
    borderRadius: 50,
    borderColor: colors.secondary,
    zIndex: 1,
  },
  image: {
    position: "absolute",
    height: "90%",
    width: "90%",
    resizedMode: "contain",
    right: -95,
    top: 90,
  },
  bottomSection: {
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  cartRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  removeButton: {
    width: "47%",
    backgroundColor: colors.secondary,
  },
  removeButtonText: {
    color: colors.tertiary + "cc",
  },
  CartCounter: {
    width: "47%",
  },
});

export default Details;
