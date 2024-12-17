import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import StyledText from "../Texts/StyledText";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../config/theme";
import { GooglePay } from "react-native-google-pay";


const AlertModal = ({ onClose, isVisible, totalAmount }) => {
  const processGooglePay = async () => {
    const allowedCardNetworks = ["VISA", "MASTERCARD"];
    const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

    GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST); // Skift til ENVIRONMENT_PRODUCTION for live

    const paymentRequest = {
      cardPaymentMethod: {
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          gateway: "example", // Brug din betalingsgateway (Stripe, Adyen, osv.)
          gatewayMerchantId: "exampleGatewayMerchantId",
        },
        allowedCardNetworks,
        allowedCardAuthMethods,
      },
      transaction: {
        totalPrice: totalAmount.toFixed(2),
        totalPriceStatus: "FINAL",
        currencyCode: "DKK",
      },
      merchantName: "ReTrove", // Ændr dette til dit virksomhedsnavn
    };

    try {
      const isReady = await GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods);
      if (isReady) {
        const token = await GooglePay.requestPayment(paymentRequest);
        console.log("Payment token:", token);
        // Håndter betalingen her (f.eks. send token til backend)
        onClose(); // Luk modal, hvis betalingen er succesfuld
      } else {
        console.warn("Google Pay is not ready on this device");
      }
    } catch (error) {
      console.error("Error with Google Pay:", error);
    }
  };

  return (
    <Modal transparent={true} animationType="slide" visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <StyledText style={styles.title}>Confirmation</StyledText>
          <TouchableOpacity onPress={onClose}>
            <Feather name="x" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <StyledText style={styles.text}>Complete your payment using Google Pay:</StyledText>
          <TouchableOpacity style={styles.googlePayButton} onPress={processGooglePay}>
          <StyledText style={styles.googlePayButtonText}>Pay with Google Pay</StyledText>
          </TouchableOpacity>
      </View>
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
});

export default AlertModal;
