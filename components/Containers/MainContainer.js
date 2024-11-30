import { View, KeyboardAdvoidingView } from "react-native";
import { colors } from "../../config/theme";
import { onIOS } from "../../config/constants";
import { HeaderHeightContext } from "@react-navigation/elements";
import { useContext } from "react";

const MainContainer = ({ children, style, ...props }) => {
  return (
    <View
      style={[{ flex: 1, backgroundColor: colors.primary }, style]}
      {...props}
    >
      <KeyboardAdvoidingView
        behavior={onIOS ? "padding" : ""}
        style={{ flex: 1 }}
        keyboardVerticalOffset={useContext(HeaderHeightContext) ?? 0}
      >
        {children}
      </KeyboardAdvoidingView>
    </View>
  );
};

export default MainContainer;
