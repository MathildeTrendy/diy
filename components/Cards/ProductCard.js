import React from "react";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import StyledText from "../Texts/StyledText";
import { ScreenWidth } from "../../config/constants";
import { colors } from "../../config/theme";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({
  id,
  title,
  price,
  description,
  homepageUrl,
  image,
  all,
}) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate("Details", {
      item: {
        id,
        title,
        price,
        description,
        homepageUrl,
        image,
      },
    });
  };

  return (
    <TouchableOpacity
      style={all ? styles.containerPlus : styles.container}
      onPress={handleOnPress}
    >
      {image && (
        <Image
          source={typeof image === "number" ? image : { uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
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
    width: ScreenWidth * 0.3, // Mindre bredde
    minWidth: 110, // Tilpasset minimum bredde
    backgroundColor: colors.secondary,
    borderRadius: 15,
    marginTop: 40,
    marginRight: 15,
    flexDirection: "column",
    overflow: "hidden",
  },
  containerPlus: {
    width: ScreenWidth * 0.35, // Justeret bredde for større kort
    minWidth: 130,
    backgroundColor: colors.secondary,
    borderRadius: 15,
    marginTop: 30,
    marginRight: 20,
    flexDirection: "column",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: ScreenWidth * 0.3, // Justeret højde
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  details: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 85, // Passende højde til detaljer
  },
  text: {
    textAlign: "center",
    marginBottom: 5,
    color: colors.textPrimary,
  },
  price: {
    color: colors.accent + "cc",
    fontWeight: "bold",
  },
});

export default ProductCard;
