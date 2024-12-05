import { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import {
  MainContainer,
  StyledTextInput,
  ProductCard,
  StyledText,
} from "../components";
import { getDiyData } from "../config/data";
import { colors } from "../config/theme";

const Products = ({ route }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    try {
      let availableDiyData = getDiyData({
        popular: route.name == "Popular",
        searchTerm,
      });
      setFilteredProducts(availableDiyData);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

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
          <StyledText small style={styles.emptryText}>
            No match found
          </StyledText>
        )}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingTop: 5,
  },
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
