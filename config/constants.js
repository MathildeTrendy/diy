import { Platform, Dimensions } from "react-native";

const onIOS = Platform.OS === "ios";


export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeight = Dimensions.get("screen").height;
