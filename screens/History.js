// layout
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

// navigation
import { useNavigation } from "@react-navigation/native";

// firebase config
import { rtdb } from "../firebase/config";

// constants
import { colors } from "../constants/Colors";
import {
  screenWidth,
  screenHeight,
  statusBarHeight,
} from "../constants/LayoutTools";

// assets
import { hamburgerMenuBrownIcon, calendarIcon } from "../assets/index";

// ------------------------- MAIN CODE ------------------------- //
const History = () => {
  const [historyData, setHistoryData] = useState([]);

  // Read "History/" data from RTDB
  useEffect(() => {
    const historyRef = rtdb.ref("machine/" + "History/");
    const listener = historyRef.on("value", (snapshot) => {
      const fetchedData = snapshot.val();

      const dataArr = [];

      for (let key in fetchedData) {
        dataArr.push(fetchedData[key]);
      }

      setHistoryData(dataArr);
    });

    return () => {
      // Unsubscribe from database updates when the component unmounts
      historyRef.off("value", listener);
    };
  }, []);

  const navigation = useNavigation();

  if (Platform.OS === "ios") {
    console.log(`IOS | Width: ${screenWidth}, Height: ${screenHeight}`);
  } else {
    console.log(`Android | Width: ${screenWidth}, Height: ${screenHeight}`);
  }

  let [fontsLoaded] = useFonts({
    LatoLight: require("../assets/fonts/Lato-Light.ttf"),
    LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      {Platform.OS === "android" && (
        <StatusBar style="dark" backgroundColor={colors.white} />
      )}
      {Platform.OS === "ios" && <StatusBar style="dark" />}
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Image
          source={hamburgerMenuBrownIcon}
          style={styles.hamburgerMenuIcon}
        />
      </TouchableOpacity>
      <View style={styles.banner}>
        <Text style={styles.txtTitle}>History</Text>
      </View>
      <ScrollView>
        <View style={styles.historyContainer}>
          {historyData &&
            historyData.map((item) => (
              <View style={styles.historyItem} key={item.currentDate}>
                <View style={styles.totalNumberContainer}>
                  <Text style={styles.totalNumber}>{item.numberOfBricks}</Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.historyText}>
                    Total Number of Bricks Molded Today
                  </Text>
                  <View style={styles.iconAndTextContainer}>
                    <Image source={calendarIcon} />
                    <Text style={styles.date}>Date: {item.currentDate}</Text>
                  </View>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default History;

// ------------------------- STYLES ------------------------- //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tertiary,
    marginTop: statusBarHeight,
  },
  hamburgerMenuIcon: {
    // marginTop: 24,
    // marginTop: "3.09%",
    marginTop: screenHeight * 0.0309,
    marginBottom: screenHeight * 0.0309,
    // marginLeft: 16,
    // marginLeft: "4.44%",
    marginLeft: screenWidth * 0.04,
  },
  banner: {
    // height: 77,
    height: screenHeight * 0.1,
    // height: "9.92%",
    width: "100%",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderTopColor: colors.tertiary,
    // borderTopWidth: 50,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    // borderWidth: 0.5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  txtTitle: {
    fontSize: 39,
    fontFamily: "LatoBold",
    color: colors.black75,
  },
  historyContainer: {
    alignSelf: "center",
    // marginTop: 24,
    // marginTop: "2.06%",
    marginTop: screenHeight * 0.0206,
    // height: 480,
    height: screenHeight * 0.6186,
    // height: "61.86%",
    // width: 297,
    width: screenWidth * 0.825,
    // width: "82.5%",
    // borderWidth: 0.5,
  },
  historyItem: {
    flexDirection: "row",
    // height: 96,
    height: screenHeight * 0.1224,
    // height: "12.24%",
    width: "100%",
    // borderWidth: 0.5,
    marginBottom: 8,
  },
  totalNumberContainer: {
    height: "100%",
    width: "30.97%",
    // borderWidth: 0.5,
    backgroundColor: colors.primary80,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  totalNumber: {
    fontSize: 64,
    fontFamily: "LatoBold",
    color: colors.tertiary,
  },
  detailsContainer: {
    height: "100%",
    width: "69.03%",
    // borderWidth: 0.5,
    backgroundColor: colors.primary,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  historyText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "LatoRegular",
    color: colors.tertiary,
  },
  date: {
    textAlign: "center",
    fontSize: 13,
    fontFamily: "LatoRegular",
    color: colors.tertiary,
    marginTop: 2,
    marginLeft: 8,
  },
  iconAndTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
