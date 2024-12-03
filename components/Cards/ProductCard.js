import StyledText from "../Texts/StyledText";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { ScreenWidth } from "../../config/constants";
import { colors } from "../../config/theme";
import { useNavigation } from "@react-navigation/native";

//se produktdetaljer
const ProductCard = ({ id, name, currency, price, image }) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate("Details", { id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <Image source={image} style={styles.image} />
      <View style={styles.details}>
        <StyledText style={styles.text} small numberOfLines={2}>
          {name}
        </StyledText>
        <StyledText style={styles.price} bold>
          {currency + price}
        </StyledText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth * 0.36,
    height: ScreenWidth * 0.46,
    miniWidth: 135,
    minHeight: 173,
    backgroundColor: colors.secondary,
    borderRadius: 15,
    marginTop: 60,
    marginRight: 25,
    justifyContent: "flex-end",
  },
  details: {
    height: "50%",
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginBottom: 5,
  },
  price: {
    color: colors.accent + "cc",
  },

  image: {
    width: "100%",
    height: "87%",
    top: -55,
    position: "absolute",
    resizeMode: "contain",
  },
});

export default ProductCard;
