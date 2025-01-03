<<<<<<< HEAD
import React, { useContext, useState, useEffect } from "react";
import { MainContainer, StyledText, ProfileInfo, ProductCard } from "../components";
import { StyleSheet, FlatList, View, TextInput, Button } from "react-native";
=======
import { useContext } from "react";
import { MainContainer, StyledText, StyledButton, ProfileInfo, ProductCard } from "../components";
import { StyleSheet, FlatList, View, TouchableOpacity } from "react-native";
>>>>>>> b2dca616381ab6d343485c9ca9ddb7319d3a2133
import { colors } from "../config/theme";
import { UserContext } from "../utils/context";
import { AntDesign } from "@expo/vector-icons";
<<<<<<< HEAD
import { getUserItems, createItem } from "../utils/itemService";

const Profile = () => {
  const { activeUser } = useContext(UserContext);

  // State til at gemme brugerens egne items fra Firestore
  const [myItems, setMyItems] = useState([]);

  // State til oprettelse af nye items (fjern image)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [homepageUrl, setHomepageUrl] = useState("");

  // Hent brugerens items fra Firestore
  const fetchMyItems = async () => {
    if (activeUser?.uid) {
      try {
        const items = await getUserItems(activeUser.uid);
        setMyItems(items);
      } catch (error) {
        console.error("Error fetching user items: ", error);
      }
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, [activeUser]);

  const handleCreate = async () => {
    try {
      const newItem = {
        title,
        description,
        price: Number(price) || 0,
        homepageUrl,
        ownerId: activeUser.uid,
      };

      await createItem(newItem);
      // Efter oprettelse: Hent items igen
      await fetchMyItems();  
      // Clear input
      setTitle("");
      setDescription("");
      setPrice("");
      setHomepageUrl("");
    } catch (error) {
      console.warn("Error creating item:", error);
    }
  };

  return (
=======
import { ScreenWidth } from "../config/constants";
//import api from "../utils/api"; 

const Profile = () => {
    const{activeUser, setActiveUser} = useContext(UserContext);
    const {savedProducts} = useContext(SavedProductsContext);

    const handleDeleteAccount = async () => {
      Alert.alert(
        "Delete Account",
        "Are you sure you want to delete your account? This action cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                await api.delete(`/users/${activeUser.id}`);
                alert("Your account and data have been successfully deleted.");
                setActiveUser(null); //Nulstil brugeren
              } catch (error) {
                console.error("Error deleting account:", error);
                alert("An error occurred. Please try again later.");
              }
            },
          },
        ]
      );
    };
  
    return ( 
>>>>>>> b2dca616381ab6d343485c9ca9ddb7319d3a2133
    <MainContainer style={styles.container}>
      <StyledText style={styles.header} bold>
        Account
      </StyledText>

      <ProfileInfo icon="user" label="Username">
        {activeUser?.username}
      </ProfileInfo>
      <ProfileInfo icon="user" label="Email">
        {activeUser?.email}
      </ProfileInfo>
      <ProfileInfo icon="enviromento" label="Address">
        {activeUser?.address}
<<<<<<< HEAD
      </ProfileInfo>

      {/* Sektion til at oprette nye items */}
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

      {/* Viser brugerens egne items fra Firestore */}
      <StyledText style={styles.header} bold>
        My Creations
      </StyledText>
      <FlatList
        data={myItems}
=======
        </ProfileInfo>
   
    <StyledText style={styles.header} bold>
        WishList{" "}
        <AntDesign name="heart" size={17} color={colors.darkred + "cc"}/>       
    </StyledText>

    {(!savedProducts || savedProducts.length === 0) && (
        <View style={styles.emptyWishlist}>
          <AntDesign
            name="hearto"
            size={ScreenWidth * 0.4}
            color={colors.tertiary + "55"}
            style={{ marginBottom: 30 }}
          />

          <StyledText big>Your Wishlist is empty!</StyledText>
          <StyledText style={styles.emptyWishlistText}>
            No items found in your Wishlist
          </StyledText>

          <StyledButton style={styles.deleteButton} onPress={handleDeleteAccount}>
        Delete My Account
    </StyledButton>    

        </View>
      )}

    {savedProducts && savedProducts.length > 0 && (
        <FlatList
        data={savedProducts}
>>>>>>> b2dca616381ab6d343485c9ca9ddb7319d3a2133
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

      <StyledText style={styles.header} bold>
        WishList{" "}
        <AntDesign name="heart" size={17} color={colors.darkred + "cc"} />
      </StyledText>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25
  },
  header: {
    marginTop: 5,
    marginBottom: 15,
    color: colors.darkred + "cc"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginBottom: 10,
    borderRadius: 5
  },
  emptyText: {
    color: colors.tertiary,
    textAlign: "center",
  },
});

<<<<<<< HEAD
export default Profile;
=======
    },
    header: {
        marginTop: 5,
        marginBottom: 15,
        color: colors.darkred + "cc"
    },
    deleteButton: {
      marginTop: 20,
      backgroundColor: "##FF0000",
      paddingVertical: 10,
      paddingHorizontal: 40,
      width: 260,
      height: 40,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: 50,
    },
    emptyWishlist: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      emptyWishlistText: {
        color: colors.tertiary,
        marginTop: 5,
      },
})

export default Profile;
>>>>>>> b2dca616381ab6d343485c9ca9ddb7319d3a2133
