import React, { useContext } from "react";
import {
  KeyboardAdvoidingView,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { colors } from "../../config/theme";
import { onIOS } from "../../config/constants";
import { HeaderHeightContext } from "@react-navigation/elements";

const ScrollableMainContainer = ({
  children,
  style,
  contentContainerStyle,
  ...props
}) => {
  return (
    <KeyboardAdvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={useContext(HeaderHeightContext) ?? 0}
    >
      <ScrollView
        style={[{ flex: 1, backgroundColor: colors.primary }, style]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        {...props}
      >
        {children}
      </ScrollView>
    </KeyboardAdvoidingView>
  );
};

export default ScrollableMainContainer;
