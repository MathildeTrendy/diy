// ProductCard.js
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
  all, // Styrer evt. forskellig styling
}) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    // Send alle relevante felter med i 'item'
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
      {/* Viser billedet i toppen af kortet, hvis der er et billede */}
      {image && (
        <Image
          source={typeof image === 'number' ? image : { uri: image }}
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
    width: ScreenWidth * 0.36,
    minWidth: 135,
    backgroundColor: colors.secondary,
    borderRadius: 15,
    marginTop: 60,
    marginRight: 25,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  containerPlus: {
    width: ScreenWidth * 0.4,
    minWidth: 150,
    backgroundColor: colors.secondary,
    borderRadius: 15,
    marginTop: 30,
    marginRight: 25,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: ScreenWidth * 0.36, // Justeret højde
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  details: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 94, // Passende højde til detaljer
  },
  text: {
    textAlign: 'center',
    marginBottom: 5,
    color: colors.textPrimary, // Sikrer synlighed
  },
  price: {
    color: colors.accent + 'cc',
    fontWeight: 'bold',
  },
});

export default ProductCard;
