import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BrickDetails = () => {
  return (
    <View style={styles.container}>
      <Text>BrickDetails</Text>
    </View>
  );
};

export default BrickDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});