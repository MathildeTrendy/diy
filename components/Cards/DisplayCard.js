import React from "react";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import StyledText from "../Texts/StyledText";
import { ScreenWidth } from "../../config/constants";
import { colors } from "../../config/theme";

//Unique Finds and My Collection
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
    width: ScreenWidth * 0.6,
    height: ScreenWidth * 0.4, 
    minWidth: 220, 
    minHeight: 140,
    backgroundColor: colors.metallic + "cc",
    borderRadius: 20,
    marginTop: 30,
    marginRight: 20,
    flexDirection: "row",
  },
  details: {
    width: "65%", 
    padding: 10,
    justifyContent: "space-around",
  },
  productTitle: {
    color: colors.secondary,
    fontSize: 14, 
    marginBottom: 5,
  },
  productPrice: {
    color: colors.secondary,
    fontSize: 15,
  },
  productImage: {
    width: "35%", 
    height: "100%",
    borderRadius: 15,
  },
});

export default DisplayCard;
