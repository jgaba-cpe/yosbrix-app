// layout
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";

// Navigation
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

// auth context
import { useAuthContext } from "../hooks/useAuthContext";

// firebase hooks
import { useLogout } from "../hooks/useLogout";

// constants
import { colors } from "../constants/Colors";
import { screenHeight, statusBarHeight } from "../constants/LayoutTools";

// assets
import HorizontalLogo from "../assets/svg/Horizontal Logo.svg";
import LogoutIcon from "../assets/svg/Logout-DrawerIcon.svg";

const CustomDrawer = (props) => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  let [fontsLoaded] = useFonts({
    LatoLight: require("../assets/fonts/Lato-Light.ttf"),
    LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HorizontalLogo />
        <Text style={styles.displayNameAndEmail}>
          {user ? `${user.displayName} | ${user.email}` : "User"}
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.textAndIconContainer} onPress={logout}>
          <LogoutIcon />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: statusBarHeight,
    backgroundColor: colors.primary,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    // 152 is what percent of 728 = 20.88%
    height: screenHeight * 0.2088,
    width: "100%",
    backgroundColor: colors.white,
  },
  displayNameAndEmail: {
    fontFamily: "LatoRegular",
    fontSize: 10,
    color: colors.black50,
    // 4 is what percent of 728 = 0.55%
    marginTop: screenHeight * 0.0055,
  },
  logoutContainer: {
    justifyContent: "center",
    // 112 is what percent of 728 = 15.38%
    height: screenHeight * 0.1538,
    // 112 is what percent of 728 = 87.30%
    width: "87.30%",
    // 16 is what percent of 252 = 6.45%
    marginLeft: "6.45%",
    borderTopWidth: 1,
    borderColor: colors.white,
  },
  textAndIconContainer: {
    flexDirection: "row",
    // 8 is what percent of 252 = 3.17%
    marginLeft: "3.17%",
  },
  logoutText: {
    fontFamily: "LatoBold",
    fontSize: 13,
    color: colors.white,
    // 8 is what percent of 252 = 3.17%
    marginLeft: "3.17%",
  },
});
