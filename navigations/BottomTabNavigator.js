// layout
import { StyleSheet } from "react-native";

// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import Dashboard from "../screens/Dashboard";
import History from "../screens/History";
import Weather from "../screens/Weather";

// constants
import { colors } from "../constants/Colors";
import { screenHeight, screenWidth } from "../constants/LayoutTools";

// assets
import DashboardActive from "../assets/svg/Dashboard Active.svg";
import DashboardInactive from "../assets/svg/Dashboard Inactive.svg";
import HistoryActive from "../assets/svg/History Active.svg";
import HistoryInactive from "../assets/svg/History Inactive.svg";
import WeatherActive from "../assets/svg/Weather Active.svg";
import WeatherInactive from "../assets/svg/Weather Inactive.svg";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.bottomTabBar,
      }}
    >
      <Tab.Screen
        name="Dashboard Tab"
        component={Dashboard}
        options={() => ({
          tabBarIcon: ({ focused }) => {
            let icon;
            icon = focused ? <DashboardActive /> : <DashboardInactive />;
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
            icon = focused ? <HistoryActive /> : <HistoryInactive />;
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
            icon = focused ? <WeatherActive /> : <WeatherInactive />;
            return icon;
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  bottomTabBar: {
    position: "absolute",
    backgroundColor: colors.primary,
    borderRadius: 32,
    // 56 is what percent of 728 = 7.69%
    height: screenHeight * 0.0769,
    // 320 is what percent of 728 = 88.9%
    width: screenWidth * 0.889,
    // 8 is what percent of 728 = 1.1%
    bottom: screenHeight * 0.011,
    // 20 is what percent of 360 = 5.56%
    left: screenWidth * 0.0556,
  },
});
