// layout
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

// Navigation
import { createDrawerNavigator } from "@react-navigation/drawer";

// Screens
import BrickDetails from "../screens/BrickDetails";
import MachineManual from "../screens/MachineManual";
import AboutUs from "../screens/AboutUs";
import BottomTabNavigator from "./BottomTabNavigator";
import CustomDrawer from "../components/CustomDrawer";

// constants
import { colors } from "../constants/Colors";

// assets
import DashboardDrawerIconInactive from "../assets/svg/Dashboard-DrawerIcon-Inactive.svg";
import ManualDrawerIconInactive from "../assets/svg/Manual-DrawerIcon-Inactive.svg";
import BrickDrawerIconInactive from "../assets/svg/Brick-DrawerIcon-Inactive.svg";
import AboutUsDrawerIconInactive from "../assets/svg/AboutUs-DrawerIcon-Inactive.svg";
import DashboardDrawerIconActive from "../assets/svg/Dashboard-DrawerIcon-Active.svg";
import ManualDrawerIconActive from "../assets/svg/Manual-DrawerIcon-Active.svg";
import BrickDrawerIconActive from "../assets/svg/Brick-DrawerIcon-Active.svg";
import AboutUsDrawerIconActive from "../assets/svg/AboutUs-DrawerIcon-Active.svg";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  let [fontsLoaded] = useFonts({
    LatoLight: require("../assets/fonts/Lato-Light.ttf"),
    LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: styles.drawerLabel,
        drawerActiveBackgroundColor: colors.white,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.white,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Dashboard Drawer"
        component={BottomTabNavigator}
        options={{
          drawerLabel: "Dashboard",
          drawerIcon: ({ focused }) => {
            let icon;
            icon = focused ? <DashboardDrawerIconActive /> : <DashboardDrawerIconInactive />;
            return icon;
          } 
        }}
      />
      <Drawer.Screen
        name="Machine Manual"
        component={MachineManual}
        options={{drawerIcon: ({ focused }) => {
          let icon;
          icon = focused ? <ManualDrawerIconActive /> : <ManualDrawerIconInactive />;
          return icon;
        } }}
      />
      <Drawer.Screen
        name="Brick Details"
        component={BrickDetails}
        options={{drawerIcon: ({ focused }) => {
          let icon;
          icon = focused ? <BrickDrawerIconActive /> : <BrickDrawerIconInactive />;
          return icon;
        } }}
      />
      
      <Drawer.Screen name="About Us" component={AboutUs} options={{drawerIcon: ({ focused }) => {
            let icon;
            icon = focused ? <AboutUsDrawerIconActive /> : <AboutUsDrawerIconInactive />;
            return icon;
          } }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  drawerLabel: {
    fontFamily: "LatoBold",
    fontSize: 13,
    marginLeft: -16,
  },
});
