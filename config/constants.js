import { Platform, Dimensions } from "react-native";

// current os
export const onIOS = Platform.OS === "ios";

// screen dimensions
export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeight = Dimensions.get("screen").height;

