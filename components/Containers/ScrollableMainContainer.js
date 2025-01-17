import React, { useContext } from "react";
import {
  KeyboardAvoidingView,
  FlatList,
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

  const data = React.Children.toArray(children);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={headerHeight ?? 0}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => item}
        keyExtractor={(_, index) => index.toString()}
        style={[{ flex: 1, backgroundColor: colors.primary }, style]}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        {...props}
      />
    </KeyboardAvoidingView>
  );
};

export default ScrollableMainContainer;
