import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../utilities/Colors";
import { screenHeight, screenWidth } from "../utilities/LayoutTools";

const Trial = () => {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.childContainer1}>
        <View style={styles.grandChildContainer1}>
        </View>
      </View>
      <View style={styles.childContainer2}>
        <View style={styles.grandChildContainer2}>
        </View>
        <View style={styles.grandChildContainer3}>
        </View>
      </View>
    </View>
  );
};

export default Trial;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: colors.tertiary,
    justifyContent: "center",
    alignItems: "center"
  },
  childContainer1: {
    // height: 300,
    height: screenHeight * 0.375,
    // height: "37.5%",
    // width: 300,
    width: screenWidth * 0.833,
    // width: "83.33%",
    borderWidth: 0.5,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center"
  },
  grandChildContainer1: {
    // height: 100,
    height: "33.33%",
    // width: 100, 
    width: "33.33%",
    backgroundColor: colors.secondary,
  },
  childContainer2: {
    // height: 240,
    height: screenHeight * 0.375,
    // height: "30.0%",
    // width: 240,
    width: screenWidth * 0.6667,
    // width: "66.67%",
    // borderWidth: 0.5,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 40,
    marginTop: screenHeight * 0.05,
    // marginTop: "5%",
  },
  grandChildContainer2: {
    // height: 80,
    height: "33.33%",
    // width: 80, 
    width: "33.33%",
    backgroundColor: colors.secondary,
    // marginTop: 32,
    // marginTop: "13.33%",
  },
  grandChildContainer3: {
    // height: 80,
    height: "33.33%",
    // width: 80, 
    width: "33.33%",
    backgroundColor: colors.secondary,
    // marginTop: 32,
    marginTop: "13.33%",
  },
});
