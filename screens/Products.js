import { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { MainContainer, StyledTextInput, ProductCard } from "../components";
import { getDiyData } from "../config/data";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      let availableDiyData = getDiyData({});
      setFilteredProducts(availableDiyData);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <MainContainer style={styles.container}>
      <StyledTextInput
        icon="search1"
        placeholder="Search"
        style={styles.search}
      />

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard {...item} />}
        keyExtractor={({ id }) => id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 25,
          marginBottom: 10,
        }}
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
});
export default Products;
