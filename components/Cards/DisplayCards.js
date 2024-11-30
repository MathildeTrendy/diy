import StyledText from "../Texts/StyledText";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { ScreenWidth } from "../../config/constants";
import { colors } from "../../config/theme";

const DisplayCard = ({ name, origin, year, currency, price, image }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.details}>
        <StyledText style={StyleSheet.text} big numberOfLines={2}>
          {name}
        </StyledText>
        <StyledText style={StyleSheet.text} small>
          {origin}
        </StyledText>
        <StyledText style={StyleSheet.text} small>
          {year}
        </StyledText>
        <StyledText style={StyleSheet.text} big>
          {currency + price}
        </StyledText>
      </View>
      <Image source={image} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth * 0.67,
    height: ScreenWidth * 0.43,
    miniWidth: 250,
    minHeight: 160,
    backgroundColor: colors.accent + "cc",
    borderRadius: 25,
    marginTop: 45,
    marginRight: 25,
    flexDirection: "row",
  },
  details: {
    width: "70%",
    padding: 15,
    justifyContent: "space-around",
  },
  text: {
    color: colors.secondary,
  },
  image: {
    width: "30%",
    height: "120%",
    top: -45,
  },
});

export default DisplayCard;
