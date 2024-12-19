import { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Details, Cart } from "../screens";
import { colors } from "../config/theme";
import { onIOS } from "../config/constants";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { CartContext } from "../utils/context";
import { storeData } from "../utils/storage";
import { AlertModal, StyledText, StyledButton } from "../components";
import { GooglePay } from "react-native-google-pay";

const Stack = createStackNavigator();

const allowedPaymentMethods = [
  {
    type: 'CARD',
    parameters: {
      allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
      allowedCardNetworks: ['MASTERCARD', 'VISA'],
    },
    tokenizationSpecification: {
      type: 'PAYMENT_GATEWAY',
      parameters: {
        gateway: 'example',
        gatewayMerchantId: 'exampleGatewayMerchantId',
      },
    },
  },
];

const CartStack = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [isCheckoutModalVisible, setCheckoutModalVisible] = useState(false); 
  const [isGooglePayModalVisible, setGooglePayModalVisible] = useState(false);
  const [isOrderConfirmedModalVisible, setOrderConfirmedModalVisible] = useState(false);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const clearCart = async () => {
    try {
      await storeData("@DiyApp:CartItems", []);
      setCartItems([]);
    } catch (error) {
      console.warn(error);
    }
  };

  const initiateGooglePay = async () => {
    const totalPrice = calculateTotalPrice();
    const paymentRequest = {
      allowedPaymentMethods,
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: totalPrice.toString(),
        currencyCode: 'DKK',
      },
      merchantInfo: {
        merchantName: 'ReTrove',
      },
    };

    try {
      const isReadyToPay = await GooglePay.isReadyToPay(paymentRequest);
      if (isReadyToPay) {
        const paymentData = await GooglePay.requestPayment(paymentRequest);
        // Process the paymentData here and complete the order
        console.log("Payment Data:", paymentData);

        // Clear cart and show confirmation modal
        clearCart();
        setCheckoutModalVisible(false); // Close checkout Modal
        setGooglePayModalVisible(false); // Close Google Pay modal
        setOrderConfirmedModalVisible(true); // Show order confirmed modal
      } else {
        console.log("Google Pay is not ready to pay.");
      }
    } catch (error) {
      console.error("Google Pay error", error);
    }
  };

  const closeAllModals = () => {
    setCheckoutModalVisible(false);
    setGooglePayModalVisible(false);
    setOrderConfirmedModalVisible(false);
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: colors.tint,
          headerBackImage: ({ tintColor }) => (
            <Feather name="chevron-left" size={35} color={tintColor} />
          ),
          headerLeftContainerStyle: {
            left: onIOS ? 22 : 12,
          },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            borderBottomWidth: 0,
            elevation: 0,
            shadowColor: "transparent",
            shadowOpacity: 0,
          },
        }}
        initialRouteName="CartScreen"
      >
        <Stack.Screen
          name="CartScreen"
          component={Cart}
          options={{
            title: "Cart",
            headerRight: () => (
              <>
                {cartItems.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setCheckoutModalVisible(true)}
                    style={{ padding: 10 }}
                  >
                    <Feather name="trash" size={20} color={colors.tertiary + "cc"} />
                  </TouchableOpacity>
                )}
              </>
            ),
            headerRightContainerStyle: {
              right: 15,
            },
          }}
        />

        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: colors.secondary,
              borderBottomWidth: 0,
              elevation: 0,
              shadowColor: "transparent",
              shadowOpacity: 0,
            },
          }}
        />
      </Stack.Navigator>

      {/* Checkout Modal */}
      <AlertModal isVisible={isCheckoutModalVisible} onClose={() => setCheckoutModalVisible(false)}>
        <View style={{ padding: 20 }}>
          <StyledText style={{ marginBottom: 15 }}>
            You are about to checkout an order of ${calculateTotalPrice()}. Continue?
          </StyledText>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <StyledButton
              style={{ height: 50, width: "50%", backgroundColor: colors.tertiary }}
              onPress={() => {
                setCheckoutModalVisible(false);
                setGooglePayModalVisible(true);
              }}
            >
              Continue
            </StyledButton>

            <StyledButton
              style={{ height: 50, width: "48%", backgroundColor: colors.grey }}
              onPress={() => setCheckoutModalVisible(false)}
            >
              Cancel
            </StyledButton>
          </View>
        </View>
      </AlertModal>

      {/* Google Pay Modal */}
      <AlertModal isVisible={isGooglePayModalVisible} onClose={() => setGooglePayModalVisible(false)}>
        <View style={{ padding: 20 }}>
          <StyledText style={{ marginBottom: 15 }}>Proceed with Google Pay?</StyledText>
          <StyledButton style={{ width: "100%", backgroundColor: colors.tertiary }} onPress={initiateGooglePay}>
            Pay with Google Pay
          </StyledButton>
          <StyledButton
            style={{ width: "100%", backgroundColor: colors.grey, marginTop: 10 }}
            onPress={() => setGooglePayModalVisible(false)}
          >
            Cancel
          </StyledButton>
        </View>
      </AlertModal>

      {/* Order Confirmed Modal */}
      <AlertModal isVisible={isOrderConfirmedModalVisible} onClose={() => setOrderConfirmedModalVisible(false)}>
        <View style={{ padding: 20, alignItems: "center" }}>
          <StyledText style={{ marginBottom: 15, fontSize: 18 }}>
            Order Confirmed! 🎉
          </StyledText>
          <StyledButton
            style={{ width: "100%", backgroundColor: colors.tertiary }}
            onPress={() => setOrderConfirmedModalVisible(false)}
          >
            Great
          </StyledButton>
        </View>
      </AlertModal>
    </>
  );
};

export default CartStack;


/*
import { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Details, Cart } from "../screens";
import { colors } from "../config/theme";
import { onIOS } from "../config/constants";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { CartContext } from "../utils/context";
import { storeData } from "../utils/storage";
import {AlertModal, StyledText, StyledButton} from "../components";
import { GooglePay } from "react-native-google-pay";



const Stack = createStackNavigator();

const allowedPaymentMethods = [
    {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['MASTERCARD', 'VISA'],
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'example',
          gatewayMerchantId: 'exampleGatewayMerchantId',
        },
      },
    },
  ];

const CartStack = () => {
  const {cartItems, setCartItems} = useContext(CartContext);
  const [isCheckoutModalVisible, setCheckoutModalVisible] = useState(false); // For showing Google Pay modal
  const [isGooglePayModalVisible, setGooglePayModalVisible] = useState(false); // Tilføjer state for Google Pay visning
  const [isOrderConfirmedModalVisible, setOrderConfirmedModalVisible] = useState(false); // For confirmation


  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const clearCart = async () => {

    try {
      await storeData("@DiyApp:CartItems", []);
      setCartItems([]);
    } catch (error) {
      console.warn(error);
    }

  };

  const initiateGooglePay = async () => {
    const totalPrice = calculateTotalPrice();
    const paymentRequest = {
      allowedPaymentMethods,
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: totalPrice.toString(),
        currencyCode: 'DKK',
      },
      merchantInfo: {
        merchantName: 'ReTrove',
      },
    };
  
   
    try {
      const isReadyToPay = await GooglePay.isReadyToPay(paymentRequest);
      if (isReadyToPay) {
        const paymentData = await GooglePay.requestPayment(paymentRequest);
        // Process the paymentData here and complete the order

        clearCart();
        // Simulate a successful order
        setCheckoutModalVisible(true); // Show order confirmed modal
      } else {
        console.log("Google Pay is not ready to pay.");
      }
    } catch (error) {
      console.error("Google Pay error", error);
    }
  };

  const closeAllModals = () => {
    setCheckoutModalVisible(false);
    setGooglePayModalVisible(false);
    setOrderConfirmedModalVisible(false);
  };
  


  return (
    <>
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: colors.tint,
        headerBackImage: ({ tintColor }) => (
          <Feather name="chevron-left" size={35} color={tintColor} />

        ),
        headerLeftContainerStyle: {
          left: onIOS ? 22 : 12,

        },

        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: colors.primary,
          borderBottomWidth: 0,
          elevation: 0,
          shadowColor: "transparent",
          shadowOpacity: 0,
        },
      }}

      initialRouteName="CartScreen"

    >
      <Stack.Screen
        name="CartScreen"
        component={Cart}
        options={{
          title: "Cart",
          headerRight: () => (
            <>
            {cartItems.length > 0 &&
            <TouchableOpacity onPress={() => setCheckoutModalVisible(true)} style={{padding: 10}}>
              <Feather
              name="trash"
              size={20}
              color={colors.tertiary + "cc"} />
            </TouchableOpacity>}

          </>

          ),
          headerRightContainerStyle: {
            //push icon away from the screen
            right: 15,
          },
        }}
      />

      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.secondary,
            borderBottomWidth: 0,
            elevation: 0,
            shadowColor: "transparent",
            shadowOpacity: 0,
          },
        }}
      />
    </Stack.Navigator>

      
     <AlertModal isVisible={isCheckoutModalVisible} onClose={() => setCheckoutModalVisible(false)}
    
      >
        <View
          style={{
            /*flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
      <StyledText style={{ marginBottom: 15 }}>
          You are about to checkout an order of ${calculateTotalPrice()}. Continue?
        </StyledText>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <StyledButton
              style={{
                height: 50,
                width: "50%",
                backgroundColor: colors.tertiary,
              }}
              onPress={() => {
                setCheckoutModalVisible(false); // Close checkout Modal
                setGooglePayModalVisible(true); // Open Google Pay modal
              }}
            >
              Continue
            </StyledButton>

            
            <StyledButton
              style={{
                height: 50,
                width: "48%",
                backgroundColor: colors.grey,
              }}
              onPress={() => setCheckoutModalVisible(false)} // Luk modal ved annullering
            >
              Cancel
            </StyledButton>
          </View>
        </View>
      </AlertModal>

    
      <AlertModal
        isVisible={isGooglePayModalVisible}
        onClose={() => setGooglePayModalVisible(false)}
      >
        <View style={{ padding: 20 }}>
          <StyledText style={{ marginBottom: 15 }}>Proceed with Google Pay?</StyledText>
          <StyledButton
            style={{ width: "100%", backgroundColor: colors.tertiary }}
            onPress={initiateGooglePay}
          >
            Pay with Google Pay
          </StyledButton>
          <StyledButton
            style={{ width: "100%", backgroundColor: colors.grey, marginTop: 10 }}
            onPress={() => setGooglePayModalVisible(false)}
          >
            Cancel
          </StyledButton>
        </View>
      </AlertModal>

    
      <AlertModal
        isVisible={isOrderConfirmedModalVisible}
        onClose={() => setOrderConfirmedModalVisible(false)}
      >
        <View style={{ padding: 20, alignItems: "center" }}>
          <StyledText style={{ marginBottom: 15, fontSize: 18 }}>
            Order Confirmed! 🎉
          </StyledText>
          <StyledButton
            style={{ width: "100%", backgroundColor: colors.tertiary }}
            onPress={() => setOrderConfirmedModalVisible(false)}
          >
            Great
          </StyledButton>
        </View>
      </AlertModal>
    </>
  );
};

export default CartStack;*/