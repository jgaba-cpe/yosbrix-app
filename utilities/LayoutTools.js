import { Dimensions } from "react-native";
import Constants from "expo-constants";

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;
export const statusBarHeight = Constants.statusBarHeight;