import React, { useContext, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  Modal,
  Alert,
  TextInput,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome"; // Importér ikoner
import { StyledText } from "../components";
import { colors } from "../config/theme";
import { CartContext } from "../utils/context";
import * as ImagePicker from "expo-image-picker";
import { updateItem, deleteItem } from "../utils/itemService";

// VIGTIGT: Importér useNavigation, så du kan navigere tilbage
import { useNavigation } from "@react-navigation/native";

const Details = ({ route }) => {
  const { addItemToCart } = useContext(CartContext);
  const item = route.params?.item; // Henter det aktuelle item fra navigationens route

  // Opret navigation-objektet
  const navigation = useNavigation();

  const [quantity, setQuantity] = useState(1);
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState(null);

  // Edit state
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [titleEditValue, setTitleEditValue] = useState(item.title);
  const [descriptionEditValue, setDescriptionEditValue] = useState(item.description);
  const [priceEditValue, setPriceEditValue] = useState(item.price);
  const [homepageUrlEditValue, setHomepageUrlEditValue] = useState(item.homepageUrl);
  const [imageEditValue, setImageEditValue] = useState({
    uri: item.image,
  });

  if (!item) {
    return (
      <View style={styles.container}>
        <StyledText big>Item not found!</StyledText>
      </View>
    );
  }

  const renderImage = ({ item }) => (
    <Image
      source={typeof item === "number" ? item : { uri: item }}
      style={styles.carouselImage}
    />
  );

  const handleAddToCart = () => {
    const itemToAdd = {
      ...item,
      cartCount: quantity,
    };
    addItemToCart(itemToAdd);
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleOpenURL = () => {
    if (item.homepageUrl) {
      Linking.openURL(item.homepageUrl);
    }
  };

  // Edit logic (billedeskift, update etc.)
  const handleChangeImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const pickedImage = result.assets[0];
      setImageEditValue({
        uri: pickedImage.uri,
        name: `item-${Date.now()}.jpg`,
      });
    }
  };

  const handleUpdate = async () => {
    if (!titleEditValue || !priceEditValue) {
      alert("Please fill in all required fields (title & price).");
      return;
    }

    try {
      let imageUrl = null;
      if (imageEditValue) {
        imageUrl = imageEditValue.uri;
      }

      const itemUpdateData = {
        title: titleEditValue,
        description: descriptionEditValue,
        price: Number(priceEditValue) || 0,
        homepageUrl: homepageUrlEditValue,
        image: imageUrl,
      };

      await updateItem(item.id, itemUpdateData);
      setEditModalVisible(false);
    } catch (error) {
      console.warn("Error updating item:", error);
    }
  };

  // Delete logic
  const handleDeleteItem = async () => {
    try {
      await deleteItem(item.id);
      // Vender altid tilbage til forrige skærm (Profile ELLER Home)
      navigation.goBack();
    } catch (error) {
      console.warn("Error deleting item:", error);
    }
  };

  const createdBy = item.username;

  // Report logic
  const reportTypes = [
    "Spam",
    "Inappropriate Content",
    "Copyright Violation",
    "Fraudulent Activity",
    "Harassment",
    "Other",
  ];

  const handleReport = (type) => {
    setSelectedReportType(type);
    setReportModalVisible(false);
    Alert.alert(
      "Report Submitted",
      `Thank you for reporting "${type}". We will review it shortly.`,
      [{ text: "OK" }]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Øverste række med ikoner */}
      <View style={styles.iconRow}>
        <TouchableOpacity
          onPress={() => setEditModalVisible(true)}
          style={styles.iconButton}
          accessibilityLabel="Rediger"
        >
          <Icon name="edit" size={24} color={colors.accent} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDeleteItem}
          style={styles.iconButton}
          accessibilityLabel="Slet"
        >
          <Icon name="trash" size={24} color={colors.accent} />
        </TouchableOpacity>

        {/* Flag Icon (Rød) */}
        <TouchableOpacity
          onPress={() => setReportModalVisible(true)}
          style={styles.iconButton}
          accessibilityLabel="Rapporter"
        >
          <Icon name="flag" size={24} color={colors.red} />
        </TouchableOpacity>
      </View>

      {item.images && item.images.length > 0 ? (
        <FlatList
          data={item.images}
          renderItem={renderImage}
          horizontal
          keyExtractor={(img, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.carouselContainer}
        />
      ) : item.image ? (
        <Image
          source={typeof item.image === "number" ? item.image : { uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <StyledText style={styles.noImage}>No Image Available</StyledText>
      )}

      <View style={styles.content}>
        <StyledText big style={styles.title}>
          {item.title || "Unnamed Item"}
        </StyledText>

        <StyledText style={styles.description}>
          {item.description || "No description available."}
        </StyledText>
        <StyledText style={styles.username}>{`Created by: ${createdBy}`}</StyledText>

        {item.homepageUrl && (
          <TouchableOpacity onPress={handleOpenURL}>
            <StyledText style={styles.url}>Visit Homepage</StyledText>
          </TouchableOpacity>
        )}

        <StyledText bold style={styles.price}>
          {`Price: ${item.currency || "DKK"} ${item.price.toFixed(2)}`}
        </StyledText>

        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <StyledText style={styles.quantityButtonText}>-</StyledText>
          </TouchableOpacity>
          <StyledText style={styles.quantityText}>{quantity}</StyledText>
          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <StyledText style={styles.quantityButtonText}>+</StyledText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <StyledText style={styles.cartButtonText}>Add to Cart</StyledText>
        </TouchableOpacity>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Luk-knap (X) */}
            <TouchableOpacity
              onPress={() => {
                setEditModalVisible(false);
              }}
              style={styles.closeButton}
              accessibilityLabel="Luk"
            >
              <Icon name="times" size={24} color={colors.secondaryText} />
            </TouchableOpacity>

            <StyledText big style={styles.modalTitle}>
              Edit {item.title || "Unnamed Item"}
            </StyledText>

            <TextInput
              placeholder="Title"
              value={titleEditValue}
              onChangeText={setTitleEditValue}
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={descriptionEditValue}
              onChangeText={setDescriptionEditValue}
              style={styles.input}
            />
            <TextInput
              placeholder="Price"
              value={priceEditValue.toString()}
              onChangeText={setPriceEditValue}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Homepage URL"
              value={homepageUrlEditValue}
              onChangeText={setHomepageUrlEditValue}
              style={styles.input}
            />

            <TouchableOpacity style={styles.imageButton} onPress={handleChangeImage}>
              <AntDesign name="picture" size={20} color="white" />
              <StyledText style={styles.imageButtonText}>Change Image</StyledText>
            </TouchableOpacity>

            {imageEditValue && (
              <Image
                source={{ uri: imageEditValue.uri }}
                style={styles.previewImage}
              />
            )}

            <Button title="Update Item" onPress={handleUpdate} />
          </View>
        </View>
      </Modal>

      {/* Report Modal */}
      <Modal
        visible={isReportModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setReportModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Luk-knap (X) */}
            <TouchableOpacity
              onPress={() => {
                setReportModalVisible(false);
              }}
              style={styles.closeButton}
              accessibilityLabel="Luk"
            >
              <Icon name="times" size={24} color={colors.secondaryText} />
            </TouchableOpacity>
            <StyledText big style={styles.modalTitle}>Report Item</StyledText>
            {reportTypes.map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => handleReport(type)}
                style={styles.reportOption}
              >
                <StyledText style={styles.reportText}>{type}</StyledText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  carouselImage: {
    width: 300,
    height: 220,
    resizeMode: "contain",
    marginRight: 10,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 280,
    resizeMode: "contain",
    marginBottom: 20,
  },
  noImage: {
    textAlign: "center",
    color: colors.secondaryText,
    fontSize: 18,
    marginBottom: 20,
  },
  content: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    color: colors.primaryText,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 22,
    color: colors.secondaryText,
  },
  username: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
    color: colors.secondaryText,
    fontWeight: "bold",
  },
  url: {
    fontSize: 14,
    color: colors.accent,
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    color: colors.accent,
    marginBottom: 15,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    justifyContent: "center",
  },
  quantityButton: {
    backgroundColor: colors.metallic + "cc",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primaryText,
  },
  cartButton: {
    backgroundColor: colors.metallic + "cc",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 60,
    marginBottom: 20,
  },
  cartButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Tilføjede styles for ikonerne
  iconRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  iconButton: {
    marginLeft: 15,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: 20,
    color: colors.primaryText,
    fontSize: 18,
    fontWeight: "bold",
  },
  reportOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryText,
  },
  reportText: {
    fontSize: 16,
    color: colors.primaryText,
  },
  // Luk-knap (X) styles
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
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

export default Details;
