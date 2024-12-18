import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import StyledText from "../Texts/StyledText";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../config/theme";

 

const AlertModal = ({ children, onClose, isVisible, title, buttons }) => {

  return (

    <Modal transparent={true} animationType="slide" visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <StyledText style={styles.title}>Confirmation</StyledText>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>
        {children}
        {buttons && (
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, button.style]}
                onPress={button.onPress}
              >
                <StyledText style={styles.buttonText}>{button.text}</StyledText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </Modal>
  );
};

 

const styles = StyleSheet.create({

  modalContent: {
    width: "100%",
    height: "auto",
    backgroundColor: colors.secondary,
    position: "absolute",
    bottom: 0,


  },

  titleContainer: {
    backgroundColor: colors.tertiary,
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

  },

  title: {

    color: colors.primary,

  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 25,
    alignItems: "center",
  },
  button: {
    height: 50,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
  },

});

 

export default AlertModal;