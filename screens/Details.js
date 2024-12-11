import { useState, useEffect, useContext } from "react"; //hook ??
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
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
import { CartContext } from "../utils/context";
import { storeData } from "../utils/storage";
import { StackRouter } from "@react-navigation/native";

const Details = ({ route }) => {
  const diyId = route.params?.id;
  const [fetchedDiy, setFetchedDiy] = useState();
  const [addedToCart, setAddedToCart] = useState(false); //true = viser +/-, false = 'add cart'
  const { cartItems, setCartItems } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(1);

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
    checkCartStatus();
  }, []);

  const handleAddToCart = async (newCount) => {
    try {
      let updatedCartItems = [];

      if (!addedToCart) {

        const newItem = {...fetchedDiy, cartCount: 1};
        updatedCartItems = [newItem, ...cartItems];
        newCount = 1;
      } else if (newCount > 0) {

        updatedCartItems = cartItems.map((cartItem) =>
          cartItem.id === diyId 
          ? {...cartItem, cartCount: newCount }
          : cartItem
        );
      } else {
        updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== diyId);
      }

      await saveCartItems(updatedCartItems, newCount);
      setAddedToCart(newCount > 0);
    } catch (error) {
      console.warn(error);
    }
  };

  const saveCartItems = async (updatedCartItems, newCount) => {
    try {
      storeData("@DiyApp:CartItems", updatedCartItems);
      setCartItems(updatedCartItems);
      setCartCount(newCount);
    } catch (error) {
      console.warn(error);
    }
  };

  const checkCartStatus = () => {
    for (const cartItem of cartItems) {
      if (cartItem.id === diyId) {
        setAddedToCart(true);
        setCartCount(cartItem.cartCount);
      }
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      if(addedToCart) {
        let updatedCartItems = cartItems.filter(
          (cartItem) => cartItem.id !== diyId);
      saveCartItems(updatedCartItems);
      setAddedToCart(false);
      }
    } catch (error) {
      console.warn(error);
      
    }
  }

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
            color={colors.darkred + "cc"}
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
            <StyledButton icon="shoppingcart" onPress={handleAddToCart}>
              Add to cart
            </StyledButton>
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
              <CartCounter
                style={styles.CartCounter}
                count={cartCount}
                setCount={handleAddToCart}
                limit={fetchedDiy?.quantityAvailable}
                onPress={handleRemoveFromCart}
              />
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
    borderBottomLeftRadius: 15,
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
    borderColor: colors.darkred,
    zIndex: 1,
  },
  image: {
    position: "absolute",
    height: "90%",
    width: "90%",
    resizeMode: "contain",
    right: -50,
    top: 50,
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
    color: colors.darkred + "cc",
  },
  CartCounter: {
    width: "47%",
  },
});

export default Details;
