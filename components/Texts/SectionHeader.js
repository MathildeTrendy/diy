import { View, StyleSheet, TouchableOpacity } from "react-native";
import StyledText from "./StyledText";
import { colors } from "../../config/theme";
import { AntDesign } from "@expo/vector-icons";

const SectionHeader = ({ children, style, rightText, rightTextOnPress }) => {
  return (
    <View style={[styles.container, style]}>
      <StyledText bold>{children}</StyledText>

      {rightText && (
        <TouchableOpacity style={styles.button} onPress={rightTextOnPress}>
          <StyledText style={styles.buttonText}>{rightText + " "}</StyledText>
          <AntDesign name="arrowright" size={16} style={styles.buttonText} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: colors.tertiary + "cc",
  },
});

export default SectionHeader;
