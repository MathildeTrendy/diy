import StyledText from "../Texts/StyledText";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { ScreenWidth } from "../../config/constants";
import { colors } from "../../config/theme";
import { useNavigation } from "@react-navigation/native";

//se produktdetaljer
const DisplayCard = ({ id, name, origin, year, currency, price, image }) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate("Details", { id });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <View style={styles.details}>
        <StyledText style={styles.text} big numberOfLines={2}>
          {name}
        </StyledText>

        <StyledText style={styles.text} small>
          {origin}
        </StyledText>

        <StyledText style={styles.text} small>
          {year}
        </StyledText>
        <StyledText style={styles.text} big>
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
    backgroundColor: colors.metallic + "cc",
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
