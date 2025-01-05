// Profile.js
import React, { useContext, useState, useEffect } from "react";
import { MainContainer, StyledText, ProfileInfo, ProductCard } from "../components";
import { StyleSheet, FlatList, View, TextInput, Button } from "react-native";
import { colors } from "../config/theme";
import { UserContext } from "../utils/context";
import { AntDesign } from "@expo/vector-icons";
import { getUserItems, createItem } from "../utils/itemService";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const { activeUser } = useContext(UserContext);
  const navigation = useNavigation();

  // Liste med brugerens egne produkter
  const [products, setProducts] = useState([]);
  // Felter til at oprette nyt produkt
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [homepageUrl, setHomepageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Hent brugerens produkter fra Firestore
  const fetchProducts = async () => {
    if (!activeUser?.uid) return;
    setLoading(true);
    try {
      const items = await getUserItems(activeUser.uid);
      setProducts(items);
    } catch (error) {
      console.error("Error fetching user items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [activeUser]);

  const handleCreate = async () => {
    if (!title || !price) {
      alert("Please fill in all required fields (title & price).");
      return;
    }

    try {
      const newItem = {
        title,
        description,
        price: Number(price) || 0,
        homepageUrl,
        ownerId: activeUser.uid, // vigtigt for at kunne filtrere
      };

      await createItem(newItem);
      await fetchProducts(); // Opdater liste
      // Nulstil inputfelter
      setTitle("");
      setDescription("");
      setPrice("");
      setHomepageUrl("");
    } catch (error) {
      console.warn("Error creating item:", error);
    }
  };

  return (
    <MainContainer style={styles.container}>
      <StyledText style={styles.header} bold>
        Account
      </StyledText>

      <ProfileInfo icon="user" label="Username">
        {activeUser?.username || "N/A"}
      </ProfileInfo>
      <ProfileInfo icon="user" label="Email">
        {activeUser?.email || "N/A"}
      </ProfileInfo>

      <StyledText style={styles.header} bold>
        Create a new product
      </StyledText>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <TextInput
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Homepage URL"
          value={homepageUrl}
          onChangeText={setHomepageUrl}
          style={styles.input}
        />
        <Button title="Create Item" onPress={handleCreate} />
      </View>

      <StyledText style={styles.header} bold>
        Products
      </StyledText>
      {loading ? (
        <StyledText>Loading...</StyledText>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductCard
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              homepageUrl={item.homepageUrl}
              image={item.image}
              all
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 25, marginBottom: 10 }}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ListEmptyComponent={() => (
            <StyledText small style={styles.emptyText}>
              You have no products yet.
            </StyledText>
          )}
        />
      )}

      <StyledText style={styles.header} bold>
        WishList <AntDesign name="heart" size={17} color={colors.darkred + "cc"} />
      </StyledText>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  header: {
    marginTop: 5,
    marginBottom: 15,
    color: colors.darkred + "cc",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  emptyText: {
    color: colors.tertiary,
    textAlign: "center",
  },
});

export default Profile;
