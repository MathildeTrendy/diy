// screens/Profile.js
import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { MainContainer, StyledText, ProfileInfo, ProductCard } from "../components";
import { colors } from "../config/theme";
import { UserContext } from "../utils/context";
import { getUserItems, createItem } from "../utils/itemService";

// Dummy uploadfunktion. Hvis du vil gemme i Firebase Storage, implementér her:
const uploadImage = async (image) => {
  // return fx image.uri eller en downloadURL
  return image.uri;
};

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
  const [ownerId, setOwnerId] = ("");

  // Billed-state
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  // Modal-state
  const [modalVisible, setModalVisible] = useState(false);

  // Hent brugerens produkter fra Firestore subcollection
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

  // Vælg billede fra galleri
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const pickedImage = result.assets[0];
      setImage({
        uri: pickedImage.uri,
        name: `item-${Date.now()}.jpg`,
      });
    }
  };

  const handleCreate = async () => {
    if (!title || !price) {
      alert("Please fill in all required fields (title & price).");
      return;
    }
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image);
      }

      const newItem = {
        title,
        description,
        price: Number(price) || 0,
        homepageUrl,
        ownerId: activeUser.uid, // Afgørende for subcollection
        image: imageUrl,
      };

      await createItem(newItem);
      await fetchProducts();

      // Ryd felter og luk modal
      setTitle("");
      setDescription("");
      setPrice("");
      setHomepageUrl("");
      setImage(null);
      setModalVisible(false);
    } catch (error) {
      console.warn("Error creating item:", error);
    }
  };

  return (
    <MainContainer style={styles.container}>
      {/* Header */}
      <StyledText style={styles.header} bold>
        Account
      </StyledText>

      <ProfileInfo icon="user" label="Username">
        {activeUser?.username || "N/A"}
      </ProfileInfo>
      <ProfileInfo icon="user" label="Email">
        {activeUser?.email || "N/A"}
      </ProfileInfo>

      {/* + (plus)-knap */}
      <View style={styles.plusContainer}>
        <StyledText bold style={styles.subHeader}>
          Products
        </StyledText>

        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => setModalVisible(true)}
        >
          <AntDesign name="plus" size={20} color="#fff" />
          <StyledText style={styles.plusText}> Create Item</StyledText>
        </TouchableOpacity>
      </View>

      {/* Liste med brugerens items */}
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

      <StyledText style={[styles.header, { marginTop: 20 }]} bold>
        WishList <AntDesign name="heart" size={17} color={colors.metallic + "cc"} />
      </StyledText>

      {/* Modal til at oprette item */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <AntDesign name="closecircle" size={24} color={colors.metallic + "cc"} />
            </TouchableOpacity>

            <StyledText bold style={styles.modalTitle}>
              Create a new product
            </StyledText>

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
          

            <TouchableOpacity style={styles.imageButton} onPress={handlePickImage}>
              <AntDesign name="picture" size={20} color="white" />
              <StyledText style={styles.imageButtonText}>Select Image</StyledText>
            </TouchableOpacity>

            {image && (
              <Image source={{ uri: image.uri }} style={styles.previewImage} />
            )}

            <Button title="Create Item" onPress={handleCreate} />
          </View>
        </View>
      </Modal>
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
    color: colors.metallic + "cc",
  },
  subHeader: {
    fontSize: 18,
    color: colors.metallic + "cc",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    width: "100%",
    backgroundColor: "white",
  },
  emptyText: {
    color: colors.metallic + "cc",
    textAlign: "center",
  },
  plusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  plusButton: {
    flexDirection: "row",
    backgroundColor: colors.metallic + "cc",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  plusText: {
    color: "black",
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semitransparent sort baggrund
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: colors.metallic + "cc",
    fontWeight: "bold",
    alignSelf: "center",
  },
  imageButton: {
    flexDirection: "row",
    backgroundColor: colors.metallic + "cc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  imageButtonText: {
    color: "white",
    marginLeft: 8,
  },
  previewImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
    borderRadius: 10,
    alignSelf: "center",
  },
});

export default Profile;
