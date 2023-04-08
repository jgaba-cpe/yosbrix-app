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
import Wave from "../assets/svg/Wave";
import Hamburger from "../assets/svg/Hamburger Menu Icon.svg";
import TotalBrickIcon from "../assets/svg/Total Brick Icon.svg";
import CalendarDescending from "../assets/svg/Calendar Descending.svg";
import CalendarAscending from "../assets/svg/Calendar Ascending.svg";
import CalendarIcon from "../assets/svg/Calendar Icon.svg";
import YosbrixFaded from "../assets/svg/Yosbrix Faded Logo.svg";

// date formatter
import { format } from "date-fns";

// ------------------------- MAIN CODE ------------------------- //
const History = () => {
  const [count, setCount] = useState(0);
  const [historyData, setHistoryData] = useState([]);
  const [ascending, setAscending] = useState(true);

  // Read "History/" data from RTDB
  useEffect(() => {
    const counterRef = rtdb.ref("machine/" + "Counter/");
    counterRef.on("value", (snapshot) => {
      const counterData = snapshot.val();
      setCount(counterData.numberOfBricks);
    });

    const historyRef = rtdb.ref("machine/" + "History/");
    const listener = historyRef.on("value", (snapshot) => {
      const fetchedData = snapshot.val();

      // console.log(fetchedData) // JSON data from RTDB

      const dataArr = [];

      for (let key in fetchedData) {
        const [year, month, day] = fetchedData[key].currentDate.split("-");
        const currentDate = new Date(year, month - 1, day);
        const numberOfBricks = fetchedData[key].numberOfBricks;

        const dateString = format(currentDate, "MMMM d, yyyy");

        const object = {
          currentDate: dateString,
          numberOfBricks: numberOfBricks,
        };

        dataArr.push(object);
      }

      if (ascending) {
        setHistoryData(dataArr);
      } else {
        setHistoryData(dataArr.reverse());
      }
    });

    return () => {
      // Unsubscribe from database updates when the component unmounts
      historyRef.off("value", listener);
    };
  }, [ascending]);

  // console.log(historyData); // JSON converted to Array (Ascending) oldest to recent
  // console.log(historyData.reverse()) // // JSON converted to Array (Descending) recent to oldest
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

  const bannerContainerHeight = screenHeight * 0.2527;
  const bannerHeight = bannerContainerHeight * 0.869565;
  const bannerWaveHeight = bannerHeight * 0.6;

  const handleToggle = () => {
    setAscending((prev) => !prev)
  }

  return (
    <View style={styles.container}>
      {Platform.OS === "android" && (
        <StatusBar style="dark" backgroundColor={colors.white} />
      )}
      {Platform.OS === "ios" && <StatusBar style="dark" />}
      {/* ---------------------- BANNER ---------------------- */}
      <View style={styles.bannerContainer}>
        <View style={styles.banner}>
          <View style={styles.bannerHeader}>
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              <Hamburger />
            </TouchableOpacity>
            <Text style={styles.bricksMoldedText}>Bricks Molded</Text>
          </View>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>{count}</Text>
          <TotalBrickIcon />
        </View>
        <View style={styles.bannerWave}>
          <Wave height={bannerWaveHeight} />
        </View>
      </View>
      {/* ---------------------- HISTORY ---------------------- */}
      <YosbrixFaded style={styles.yosbrixFaded} />
      <View style={styles.historyContainer}>
        <View style={styles.top}>
          <View style={styles.topTextAndIcon}>
            <Text style={styles.headText}>History</Text>
            <TouchableOpacity onPress={handleToggle}>
              {ascending ? <CalendarAscending /> : <CalendarDescending />}
            </TouchableOpacity>
          </View>
          <Text style={styles.subText}>Number of Bricks Molded per Day</Text>
        </View>
        <View style={styles.bottom}>
          <ScrollView showsVerticalScrollIndicator="false">
            {historyData &&
              historyData.map((item) => (
                <View style={styles.itemContainer} key={item.currentDate}>
                  <View style={styles.left}>
                    <CalendarIcon />
                    <Text style={styles.dateText}>{item.currentDate}</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.brickPerDayText}>
                      {item.numberOfBricks}
                    </Text>
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
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
    alignItems: "center",
  },
  yosbrixFaded: {
    position: "absolute",
    // 305 is what percent of 728 = 41.9%
    top: screenHeight * 0.419,
    // 200 is what percent of 360 = 55.56%
    right: screenWidth * 0.5556,
  },
  // -------------------- BANNER -------------------- //
  bannerContainer: {
    position: "relative",
    // 160 is what percent of 728 = 21.98%
    height: screenHeight * 0.2198,
    width: "100%",
  },
  banner: {
    alignItems: "center",
    // 160 is what percent of 184 = 85.9565%
    height: "86.9565%",
    width: "100%",
    backgroundColor: colors.primary,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  bannerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // 320 is what percent of 360 = 88.89%
    width: screenWidth * 0.8889,
    // 24 is what percent of 728 = 3.3%%
    marginTop: screenHeight * 0.033,
  },
  hamburgerMenu: {},
  bricksMoldedText: {
    fontFamily: "LatoBold",
    fontSize: 31,
    color: colors.white,
  },
  totalContainer: {
    position: "absolute",
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // 320 is what percent of 360 = 88.89%
    width: screenWidth * 0.8889,
    // 69 is what percent of 728 = 9.48%
    top: screenHeight * 0.0948,
    // 24 is what percent of 360 = 6.67%
    right: screenWidth * 0.0667,
  },
  totalText: {
    fontFamily: "LatoBold",
    fontSize: 64,
    color: colors.white,
    // 8 is what percent of 360 = 2.22%
    marginRight: screenWidth * 0.022,
  },
  bannerWave: {
    position: "absolute",
    // 64 is what percent of 728 = 8.79%
    top: screenHeight * 0.0879,
  },
  // -------------------- HISTORY -------------------- //
  historyContainer: {
    zIndex: 1,
    // 429 is what percent of 728 = 58.93%
    height: screenHeight * 0.5893,
    // 312 is what percent of 360 = 86.67%
    width: screenWidth * 0.8667,
    // 429 is what percent of 728 = 4.4%
    marginTop: screenHeight * 0.044,
  },
  top: {
    // 61 is what percent of 429 = 14.22%
    height: "14.22%",
    width: "100%",
  },
  topTextAndIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headText: {
    fontFamily: "LatoBold",
    fontSize: 31,
    color: colors.primary,
  },
  subText: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    color: colors.primary,
    // 8 is what percent of 728 = 1.1%
    marginTop: screenHeight * 0.011,
  },
  bottom: {
    // 344 is what percent of 429 = 80.19%
    height: "80.19%",
    width: "100%",
    // 24 is what percent of 728 = 3.3%
    marginTop: screenHeight * 0.033,
  },
  itemContainer: {
    // Problem with ScrollView when height is set to Percentage
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // 56 is what percent of 344 = 16.3%
    // height: "16.3%",
    height: 56,
    width: "100%",
    // 16 is what percent of 728 = 2.2%
    marginBottom: screenHeight * 0.022,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    // 16 is what percent of 360 = 4.44%
    marginLeft: screenWidth * 0.0444,
  },
  dateText: {
    fontFamily: "LatoBold",
    fontSize: 20,
    color: colors.primary,
    // 8 is what percent of 360 = 2.22%
    marginLeft: screenWidth * 0.0222,
  },
  right: {
    justifyContent: "center",
    alignItems: "center",
    // 40 is what percent of 56 = 71.43%
    height: "71.43%",
    // 48 is what percent of 312 = 15.38%
    width: "15.38%",
    backgroundColor: colors.primary,
    borderRadius: 8,
    // 16 is what percent of 360 = 4.44%
    marginRight: screenWidth * 0.0444,
  },
  brickPerDayText: {
    fontFamily: "LatoBold",
    fontSize: 25,
    color: colors.white,
  },
});
