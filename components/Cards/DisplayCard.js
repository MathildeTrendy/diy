// DisplayCard.js
import React from "react";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import StyledText from "../Texts/StyledText";
import { ScreenWidth } from "../../config/constants";
import { colors } from "../../config/theme";

const DisplayCard = ({
  id,
  title,
  description,
  price,
  homepageUrl,
  image,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    // Send hele item som parameter til Details
    navigation.navigate("Details", {
      item: {
        id,
        title,
        description,
        price,
        homepageUrl,
        image,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.details}>
        <StyledText big style={styles.productTitle}>
          {title}
        </StyledText>
        <StyledText style={styles.productPrice}>
          {price} DKK
        </StyledText>
      </View>
      {image && (
        <Image
          source={typeof image === "number" ? image : { uri: image }}
          style={styles.productImage}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth * 0.67,
    height: ScreenWidth * 0.43,
    minWidth: 250,
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
  productTitle: {
    color: colors.secondary,
    fontSize: 15,
    marginBottom: 5,
    right: 6,
  },
  productPrice: {
    color: colors.secondary,
    fontSize: 16,
  },
  productImage: {
    width: "40%",
    height: "100%",
    top: 0,
    right: 26,
    borderRadius: 20,
  },
});

export default DisplayCard;
