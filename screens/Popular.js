// screens/Popular.js
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { ScrollableMainContainer, StyledText, ProductCard } from "../components";
import { colors } from "../config/theme";

const Popular = () => {
  const navigation = useNavigation();

  // Hardcodede populære items med billed-URL'er
  const popularItems = [
    {
      id: "1",
      title: "Vintage Vase",
      price: "150",
      description: "A beautiful vintage vase from the 19th century.",
      homepageUrl: "https://example.com/vase",
      image: "https://via.placeholder.com/300x200.png?text=Vintage+Vase",
      ownerId: "zovZKrDeOPU1Gbluu6Ci", // Eksempel UID
    },
    {
      id: "2",
      title: "Antique Clock",
      price: "300",
      description: "An exquisite antique clock with intricate designs.",
      homepageUrl: "https://example.com/clock",
      image: "https://via.placeholder.com/300x200.png?text=Antique+Clock",
      ownerId: "zovZKrDeOPU1Gbluu6Ci",
    },
    // Tilføj flere items efter behov
  ];

  const renderItem = ({ item }) => (
    <ProductCard
      id={item.id}
      title={item.title}
      price={item.price}
      description={item.description}
      homepageUrl={item.homepageUrl}
      image={item.image}
      ownerId={item.ownerId}
    />
  );

  return (
    <ScrollableMainContainer style={styles.container}>
      <StyledText style={styles.header} bold>
        Popular
      </StyledText>

      <FlatList
        data={popularItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={() => (
          <StyledText small style={styles.emptyText}>
            No popular products available.
          </StyledText>
        )}
      />
    </ScrollableMainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 15,
    color: colors.darkred + "cc",
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 25,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  emptyText: {
    color: colors.tertiary,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Popular;
