import { View, TouchableOpacity, StyleSheet } from "react-native";
import StyledTextInput from "./StyledTextInput";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../config/theme";

const CartCounter = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.button}>
        <AntDesign name="minuscircle" size={30} conor={colors.tertiary} />
      </TouchableOpacity>

      <StyledTextInput style={styles.input} value="1" />

      <TouchableOpacity style={styles.button}>
        <AntDesign name="pluscircle" size={30} color={colors.tertiary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    allignItems: "center",
    justifyContent: "space-around",
    baclgroundcolor: colors.secondary,
    borderRadius: 15,
    width: "100%",
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 50,
    fontSize: 20,
    paddingLeft: 1,
    paddingRight: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default CartCounter;
