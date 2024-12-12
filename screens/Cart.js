import { useContext, useState, useEffect } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { MainContainer, StyledText, StyledButton, AlertModal } from "../components";
import { CartCard } from "../components";
import { colors } from "../config/theme";
import { Feather } from "@expo/vector-icons";
import { ScreenWidth } from "../config/constants";
import { CartContext } from "../utils/context";
import { storeData } from "../utils/storage";

const Cart = () => {
  const {cartItems, setCartItems} = useContext(CartContext);
  const [cartTotal, setCartTotal] = useState(0);
  const [isModalVisible, setIsModalVisible ] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const calculateCartTotal = () => {
    if(cartItems.length > 0) {
      const cartTotal = cartItems.reduce((accumulator, cartItem ) => {
        return accumulator + cartItem.price * cartItem.cartCount;
      }, 0);
      setCartTotal(cartTotal);
    }
  };

  useEffect(() => {
    calculateCartTotal();
  }, [cartItems]);

  const checkOut = (isConfirmed) => {
    if(isConfirmed == true) {
    setIsModalVisible(true);    //clearCart();

    setTimeout(() => {
      setOrderConfirmed(true),
      setIsConfirming(false)

    }, 2000);
  }else {

  setIsModalVisible(true);
  }
};

  const cancelCheckout = () => {
    if(orderConfirmed) {
      return completeOrder();
    }
    setIsModalVisible(false);
  };

  const completeOrder = async () => {
    await clearCart();
    setIsModalVisible(false);
    setOrderConfirmed(false);
  }


  const clearCart = async () => {
    try {
      storeData("@DiyApp:CartItems", []);
      setCartItems([]);
    } catch (error) {
      console.warn(error);
      
    }
  };

  return (
    <MainContainer style={styles.container}>
      {cartItems.length <= 0 && (
        <View style={styles.emptyCart}>
          <Feather
            name="shopping-cart"
            size={ScreenWidth * 0.4}
            color={colors.tertiary}
            style={{ marginBottom: 50 }}
          />

          <StyledText big>Your cart is empty!</StyledText>
          <StyledText style={styles.emptyCartText}>
            No items found in your cart
          </StyledText>
        </View>
      )}

      {cartItems.length > 0 && (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => 
            <CartCard id={item.id} 
            {...item} />}
            showVerticalScrollIndicator={false}
          />

          <View style={styles.divider} />

          <View style={styles.checkoutRow}>
            <StyledText big style={styles.totalAmount}>
              {`$${cartTotal}`}
            </StyledText>
            <StyledButton style={styles.checkoutButton}onPress={checkOut} >Checkout</StyledButton>
          </View>
        </>
      )}
      <AlertModal isVisible={isModalVisible} onClose={cancelCheckout}>
       {!orderConfirmed && (
        <View style={styles.modalContentContainer}>
        <StyledText style={{textAlign: "center", marginBottom: 15}}>
          You are about to checkout an order of {" "}
        <StyledText bold>{`$${cartTotal}`}</StyledText>. Continue?
        </StyledText>
      
        <StyledButton 
          style={[styles.modalButton, { backgroundColor: colors.tertiary}]}
          isLoading={isConfirming} 
          onPress={() => checkOut(true)}
          >
          Continue
        </StyledButton>

        <StyledButton
        style={[styles.modalButton, { backgroundColor: colors.grey }]}
        onPress={cancelCheckout}
      >
        Cancel
      </StyledButton>
    </View>
  )}

        {orderConfirmed && (  
        <View style={styles.modalContentContainer}>
          <Feather 
          name="check-circle" 
          size={45} 
          color={colors.green} 
          style={{marginBottom: 10}} />
        
        <StyledText style={{marginBottom: 15}}>
          Order Confirmed!
        </StyledText>
        <StyledButton 
        style={[styles.modalButton, {backgroundColor: colors.green }]} 
        onPress={completeOrder}
        >
          Great!
        </StyledButton>
        </View>
        )}    
    </AlertModal>
    </MainContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingHorizontal: 25,
  },
  divider: {
    height: 1,
    backgroundColor: colors.secondary,
    marginVertical: 1,
  },
  checkoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  totalAmount: {
    width: "40%",
    color: colors.darkred + "cc",
  },
  checkoutButton: {
    width: "50%",
  },
  emptyCart: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCartText: {
    color: colors.tertiary,
    marginTop: 5,
  },
  modalContentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  modalButton: {
    height: 50,
    width: "80%",
    marginVertical: 10,
    borderRadius: 8,
  }
});

export default Cart;
