import React from "react";

// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import Dashboard from "../screens/Dashboard";
import History from "../screens/History";
import Weather from "../screens/Weather";
import { Image } from "react-native";

// Icons
import {
  dashboardIconFocused,
  historyIconFocused,
  weatherIconFocused,
  dashboardIcon,
  historyIcon,
  weatherIcon,
} from "../assets/index";

// utilities
import { colors } from "../utilities/Colors";
import { screenHeight } from "../utilities/LayoutTools";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          // height: 64,
          height: screenHeight * 0.08,
          // height: "8%",
        },
      }}
    >
      <Tab.Screen
        name="Dashboard Tab"
        component={Dashboard}
        options={() => ({
          tabBarIcon: ({ focused }) => {
            let icon;
            icon = focused ? (
              <Image source={dashboardIconFocused} />
            ) : (
              <Image source={dashboardIcon} />
            );
            return icon;
          },
        })}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={() => ({
          tabBarIcon: ({ focused }) => {
            let icon;
            icon = focused ? (
              <Image source={historyIconFocused} />
            ) : (
              <Image source={historyIcon} />
            );
            return icon;
          },
        })}
      />
      <Tab.Screen
        name="Weather"
        component={Weather}
        options={() => ({
          tabBarIcon: ({ focused }) => {
            let icon;
            icon = focused ? (
              <Image source={weatherIconFocused} />
            ) : (
              <Image source={weatherIcon} />
            );
            return icon;
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
