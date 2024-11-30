import React, { useContext } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { colors } from "../../config/theme";
import { HeaderHeightContext } from "@react-navigation/elements";

const ScrollableMainContainer = ({
  children,
  style,
  contentContainerStyle,
  ...props
}) => {
  const headerHeight = useContext(HeaderHeightContext);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={headerHeight ?? 0}
    >
      <ScrollView
        style={[{ flex: 1, backgroundColor: colors.primary }, style]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        {...props}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ScrollableMainContainer;
