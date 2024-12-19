import StyledText from "../Texts/StyledText";
import { TouchableOpacity, View, StyleSheet } from "react-native"; // fjernet Image import
import { ScreenWidth } from "../../config/constants";
import { colors } from "../../config/theme";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ id, title, price, all }) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate("Details", { id });
  };

  return (
    <TouchableOpacity
      style={all ? styles.containerPlus : styles.container}
      onPress={handleOnPress}
    >
      <View style={styles.details}>
        <StyledText style={styles.text} small numberOfLines={2}>
          {title}
        </StyledText>
        <StyledText style={styles.price} bold>
          {price} DKK
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
  containerPlus: {
    width: ScreenWidth * 0.4,
    height: ScreenWidth * 0.5,
    miniWidth: 150,
    minHeight: 188,
    backgroundColor: colors.secondary,
    borderRadius: 15,
    marginTop: 60,
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
});

export default ProductCard;
