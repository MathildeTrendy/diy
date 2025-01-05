import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import {
  MainContainer,
  StyledTextInput,
  ProductCard,
  StyledText,
} from "../components";
import { colors } from "../config/theme";
import { getAllItems } from "../utils/itemService";

const Products = ({ route }) => {
  const [allItems, setAllItems] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Hent alle items fra Firestore, én gang når komponenten mountes
  useEffect(() => {
    fetchAllItems();
  }, []);

  const fetchAllItems = async () => {
    try {
      const items = await getAllItems();
      setAllItems(items);
      setFilteredProducts(items);
    } catch (error) {
      console.warn("Error fetching items:", error);
    }
  };

  // Kør filtrering hver gang searchTerm ændres
  useEffect(() => {
    handleFilter();
  }, [searchTerm, allItems]);

  // Hvis du vil tjekke for "Popular"-route, kan du gøre:
  // const isPopularRoute = route?.name === "Popular";
  // og filtrere items, der fx har item.popular === true

  const handleFilter = () => {
    if (!searchTerm) {
      // Hvis ingen søgeterm, vis alle
      setFilteredProducts(allItems);
      return;
    }
    const lowerSearch = searchTerm.toLowerCase();

    const filtered = allItems.filter((item) => {
      const titleMatch = item.title?.toLowerCase().includes(lowerSearch);
      const descMatch = item.description?.toLowerCase().includes(lowerSearch);
      return titleMatch || descMatch;
    });
    setFilteredProducts(filtered);
  };

  return (
    <MainContainer>
      {/* Søgefelt */}
      <StyledTextInput
        icon="search1"
        placeholder="Search"
        style={styles.search}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Liste med filtrerede items */}
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard {...item} all />}
        keyExtractor={({ id }) => id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 25,
          marginBottom: 10,
        }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListEmptyComponent={() => (
          <StyledText small style={styles.emptyText}>
            No match found
          </StyledText>
        )}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  search: {
    fontWeight: "500",
    marginBottom: 10,
  },
  emptyText: {
    color: colors.tertiary,
    textAlign: "center",
  },
});

export default Products;
