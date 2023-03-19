import React from "react";

// Navigation
import { createDrawerNavigator } from "@react-navigation/drawer";

// Screens
import BrickDetails from "../screens/BrickDetails";
import MachineManual from "../screens/MachineManual";
import AboutUs from "../screens/AboutUs";
import BottomTabNavigator from "./BottomTabNavigator";
// import Trial from "../screens/Trial";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Dashboard Drawer" component={BottomTabNavigator} />
      <Drawer.Screen name="Brick Details" component={BrickDetails} />
      <Drawer.Screen name="Machine Manual" component={MachineManual} />
      <Drawer.Screen name="About Us" component={AboutUs} />
      {/* <Drawer.Screen name="Trial" component={Trial} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
