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

  useEffect(() => {
    handleFilter();
  }, [searchTerm, allItems]);


  const handleFilter = () => {
    if (!searchTerm) {
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
      <StyledTextInput
        icon="search1"
        placeholder="Search"
        style={styles.search}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

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
