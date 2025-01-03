import React, { useContext, useState, useEffect } from "react";
import { MainContainer, StyledText, ProfileInfo, ProductCard } from "../components";
import { StyleSheet, FlatList, View, TextInput, Button } from "react-native";
import { colors } from "../config/theme";
import { UserContext } from "../utils/context";
import { AntDesign } from "@expo/vector-icons";
import { getUserItems, createItem } from "../utils/itemService";

const Profile = () => {
  const { activeUser } = useContext(UserContext);

  const [myItems, setMyItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [homepageUrl, setHomepageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Hent brugerens items fra Firestore
  const fetchMyItems = async () => {
    if (activeUser?.uid) {
      setLoading(true);
      try {
        const items = await getUserItems(activeUser.uid);
        setMyItems(items);
      } catch (error) {
        console.error("Error fetching user items: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, [activeUser]);

  const handleCreate = async () => {
    if (!title || !price) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const newItem = {
        title,
        description,
        price: Number(price) || 0,
        homepageUrl,
        ownerId: activeUser.uid,
      };

      await createItem(newItem);
      await fetchMyItems(); // Opdater items
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
        Opret et nyt item
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
        My Creations
      </StyledText>
      {loading ? (
        <StyledText>Loading...</StyledText>
      ) : (
        <FlatList
          data={myItems}
          renderItem={({ item }) => <ProductCard {...item} all />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 25,
            marginBottom: 10,
          }}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ListEmptyComponent={() => (
            <StyledText small style={styles.emptyText}>
              You have no items yet.
            </StyledText>
          )}
        />
      )}

      <StyledText style={styles.header} bold>
        WishList{" "}
        <AntDesign name="heart" size={17} color={colors.darkred + "cc"} />
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
