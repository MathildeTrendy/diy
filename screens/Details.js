import React from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import { StyledText } from "../components";
import { colors } from "../config/theme";

const Details = ({ route }) => {
  const item = route.params?.item;

  if (!item) {
    return (
      <View style={styles.container}>
        <StyledText big>Item not found!</StyledText>
      </View>
    );
  }

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.carouselImage} />
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {item.images && item.images.length > 0 ? (
        <FlatList
          data={item.images}
          renderItem={renderImage}
          horizontal
          keyExtractor={(image, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.carouselContainer}
        />
      ) : (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}

      <View style={styles.content}>
        <StyledText big style={styles.title}>
          {item.title || "Unnamed Item"}
        </StyledText>
        <StyledText style={styles.description}>
          {item.description || "No description available."}
        </StyledText>
        <StyledText bold style={styles.price}>
          {`Price: ${item.currency || "DKK"}${item.price.toFixed(2)}`}
        </StyledText>
        <StyledText style={styles.owner}>
          {`Owner: ${item.ownerUsername || "Unknown"}`}
        </StyledText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  carouselImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginRight: 10,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  content: {
    width: "100%",
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    color: colors.primaryText,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "justify",
    lineHeight: 28,
    color: colors.secondaryText,
  },
  price: {
    fontSize: 20,
    color: colors.accent,
    marginBottom: 30,
  },
  owner: {
    fontSize: 16,
    marginTop: 10,
    color: colors.secondaryText,
  },
});

export default Details;
