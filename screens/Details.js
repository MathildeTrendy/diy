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
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Importér ikoner
import { StyledText } from "../components";
import { colors } from "../config/theme";
import { CartContext } from "../utils/context";

const Details = ({ route }) => {
  const { addItemToCart } = useContext(CartContext);
  const item = route.params?.item; // Henter det aktuelle item fra navigationens route

  const [quantity, setQuantity] = useState(1);
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState(null);

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
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleOpenURL = () => {
    if (item.homepageUrl) {
      Linking.openURL(item.homepageUrl);
    }
  };

  // Brug `item.username` direkte, da det blev sat under oprettelse af item'et
  const createdBy = item.username || "Unknown";

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
    // Her kan du håndtere rapporteringen, f.eks. sende til backend
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
        <TouchableOpacity onPress={() => {}} style={styles.iconButton} accessibilityLabel="Rediger">
          <Icon name="edit" size={24} color={colors.accent} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.iconButton} accessibilityLabel="Slet">
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
          keyExtractor={(image, index) => index.toString()}
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
        <StyledText style={styles.username}>
          {`Created by: ${createdBy}`} {/* Viser brugernavnet for opretteren */}
        </StyledText>

        {item.homepageUrl && (
          <TouchableOpacity onPress={handleOpenURL}>
            <StyledText style={styles.url}>Visit Homepage</StyledText>
          </TouchableOpacity>
        )}

        <StyledText bold style={styles.price}>
          {`Price: ${item.currency || "DKK"}${item.price.toFixed(2)}`}
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
    height: 220, // Let større end tidligere (200)
    resizeMode: "contain",
    marginRight: 10,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 280, // Let større end tidligere (250)
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
    marginBottom: 20, // Sørger for, at der er plads til knappen
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
    backgroundColor: "rgba(0,0,0,0.7)", // Øget opacity for bedre kontrast
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#FFFFFF", // Solid hvid baggrund for høj kontrast
    borderRadius: 10,
    padding: 20,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
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
    color: colors.primaryText, // Sørger for høj kontrast
  },
  // Luk-knap (X) styles
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1, // Sørger for, at knappen er øverst
  },
});

export default Details;
