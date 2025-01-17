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
import * as ImagePicker from "expo-image-picker";

import { MainContainer, StyledText, ProfileInfo, ProductCard } from "../components";
import { colors } from "../config/theme";
import { UserContext } from "../utils/context";
import { subscribeToUserItems, createItem } from "../utils/itemService";

import { getAuth, signOut } from "firebase/auth";

const uploadImage = async (image) => image.uri;

export default function Profile() {
  const { activeUser } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [homepageUrl, setHomepageUrl] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
    } catch (error) {
      console.error("Error on logout:", error);
    }
  };

  useEffect(() => {
    if (!activeUser?.uid) return;
    setLoading(true);

    const unsubscribe = subscribeToUserItems(activeUser.uid, (items) => {
      setProducts(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeUser]);

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
        ownerId: activeUser.uid,
        username: activeUser.displayName || "Unknown",
        image: imageUrl,
      };

      await createItem(newItem);

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
      <View style={styles.headerRow}>
        <StyledText style={styles.header} bold>
          Account
        </StyledText>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <AntDesign name="logout" size={18} color={"white"} />
          <StyledText style={styles.logoutText}>Log Out</StyledText>
        </TouchableOpacity>
      </View>

     
      <ProfileInfo icon="user" label="Username">
        {activeUser?.displayName || "N/A"}
      </ProfileInfo>
      <ProfileInfo icon="user" label="Email">
        {activeUser?.email || "N/A"}
      </ProfileInfo>

     
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

      {loading ? (
        <StyledText>Loading...</StyledText>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <ProductCard
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                homepageUrl={item.homepageUrl}
                image={item.image}
                username={item.username}
              />
            </View>
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
              <AntDesign
                name="closecircle"
                size={24}
                color={colors.metallic + "cc"}
              />
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
              <Image
                source={{ uri: image.uri }}
                style={styles.previewImage}
              />
            )}

            <Button title="Create Item" onPress={handleCreate} />
          </View>
        </View>
      </Modal>
    </MainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  header: {
    color: colors.metallic + "cc",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: colors.metallic + "cc",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    marginLeft: 5,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 18,
    color: colors.metallic + "cc",
  },
  productContainer: {
    flex: 1,
    marginBottom: 15,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
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
