// layout
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

// navigation
import { useNavigation } from "@react-navigation/native";

// auth context
import { useAuthContext } from "../hooks/useAuthContext";

// firebase config
import { rtdb } from "../firebase/config";

// local notification custom hook
import { useLocalNotification } from "../hooks/useLocalNotification";

// utilities
import { colors } from "../utilities/Colors";
import {
  screenWidth,
  screenHeight,
  statusBarHeight,
} from "../utilities/LayoutTools";

// assets
import {
  logoIcon,
  hamburgerMenuIcon,
  totalBrickIcon,
  doubleArrowIcon,
  doubleArrowSmallIcon,
  gearIcon,
  notificationOffIcon,
  notificationIcon,
  checkIcon,
  standbyIcon,
} from "../assets/index";


// ------------------------- MAIN CODE ------------------------- //
const Dashboard = () => {
  const [count, setCount] = useState(0);
  const [currentProcess, setCurrentProcess] = useState("");
  const [machineTemp, setMachineTemp] = useState(0);

  // Local Notification
  const { showNotification } = useLocalNotification();

  // Getting the current date
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  console.log(currentDate);

  // Read "Counter/numberOfBricks", "Process/currentProcess" and "Counter/numberOfBricks" data from RTDB
  useEffect(() => {
    const counterRef = rtdb.ref("machine/" + "Counter/");
    counterRef.on("value", (snapshot) => {
      const counterData = snapshot.val();
      setCount(counterData.numberOfBricks);
    });

    const processRef = rtdb.ref("machine/" + "Process/");
    processRef.on("value", (snapshot) => {
      const processData = snapshot.val();
      setCurrentProcess(processData.currentProcess);
    });

    const tempRef = rtdb.ref("machine/" + "Temp/");
    tempRef.on("value", (snapshot) => {
      const tempData = snapshot.val();
      setMachineTemp(tempData.machineTemp);
    });
  }, []);

  // Update the "Counter/numberOfBricks" data in RTDB
  const updateCounter = () => {
    const counterRef = rtdb.ref("machine/" + "Counter/" + "numberOfBricks");
    counterRef.transaction((currentCount) => {
      return (currentCount || 0) + 2;
    });
  };

  // Update the "History/`${currentDate}`/currentDate" and "History/`${currentDate}`/numberOfBricks" data in RTDB
  const updateHistory = () => {
    const historyRef1 = rtdb.ref(
      "machine/" + "History/" + `${currentDate}/` + "currentDate"
    );
    historyRef1.transaction(() => {
      return currentDate;
    });
    const historyRef2 = rtdb.ref(
      "machine/" + "History/" + `${currentDate}/` + "numberOfBricks"
    );
    historyRef2.transaction((currentCount) => {
      return (currentCount || 0) + 2;
    });
  };

  // Update the "Process/currentProcess" data in RTDB
  const updateProcessToIdle = () => {
    const processRef = rtdb.ref("machine/" + "Process/" + "currentProcess");
    processRef.transaction((currentProcess) => {
      return (currentProcess = "Idle");
    });
  };

  // Algo
  useEffect(() => {
    if (currentProcess === "Mixing") {
      showNotification("Shredding is finished!");
    }

    if (currentProcess === "Molding") {
      showNotification("Mixing is finished!");
    }

    if (currentProcess === "Finished") {
      showNotification("Molding is finished!");
      updateCounter();
      updateHistory();
      setTimeout(updateProcessToIdle, 3000);
    }
  }, [currentProcess]);

  const { user } = useAuthContext();

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
      {/* ---------------------- BANNER ---------------------- */}
      <View style={styles.bannerContainer}>
        <View style={styles.banner}>
          <View style={styles.bannerHeader}>
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              <Image source={hamburgerMenuIcon} style={styles.hamburgerMenu} />
            </TouchableOpacity>
            <Text style={styles.dashboardText}>Dashboard</Text>
          </View>
        </View>
        <View style={styles.tag}>
          <Image source={logoIcon} style={styles.logo} />
          <Text style={styles.greetingsText}>
            Hi, {user ? user.displayName : "User"}!
          </Text>
        </View>
      </View>
      {/* ---------------------- WIDGETS ---------------------- */}
      <View style={styles.widgetsContainer}>
        <TouchableOpacity
          style={styles.totalBricks}
          onPress={() => {
            navigation.navigate("History");
          }}
        >
          <Text style={styles.bricksMoldedText}>Bricks Molded</Text>
          <View style={styles.textAndIconContainer}>
            <Text
              style={
                Platform.OS === "ios"
                  ? styles.bricksMoldedNumber
                  : [styles.bricksMoldedNumber, { fontSize: 80 }]
              }
            >
              {count}
            </Text>
            <Image source={totalBrickIcon} />
          </View>
          <Image source={doubleArrowIcon} style={styles.doubleArrowIcon} />
        </TouchableOpacity>
        <View style={styles.smallWidgetsContainer}>
          <TouchableOpacity
            style={styles.weatherToday}
            onPress={() => {
              navigation.navigate("Weather");
            }}
          >
            <Text
              style={
                Platform.OS === "ios"
                  ? styles.normalText
                  : [styles.normalText, { fontSize: 16, marginTop: "8.7%" }]
              }
            >
              Weather Today
            </Text>
            <Text
              style={
                Platform.OS === "ios"
                  ? styles.bigText
                  : [styles.bigText, { fontSize: 43 }]
              }
            >
              30°C
            </Text>
            <Image
              source={doubleArrowSmallIcon}
              style={styles.doubleArrowSmallIcon}
            />
          </TouchableOpacity>
          <View style={styles.temperature}>
            <Text
              style={
                Platform.OS === "ios"
                  ? styles.normalText
                  : [styles.normalText, { fontSize: 16, marginTop: "8.7%" }]
              }
            >
              System Temp
            </Text>
            <Text
              style={
                Platform.OS === "ios"
                  ? styles.bigText
                  : [styles.bigText, { fontSize: 43 }]
              }
            >
              {machineTemp}°C
            </Text>
          </View>
        </View>
      </View>
      {/* ---------------------- PROCESS ---------------------- */}
      <View style={styles.processContainer}>
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <Text
              style={
                Platform.OS === "ios"
                  ? styles.currentProcessTitle
                  : [styles.currentProcessTitle, { fontSize: 19 }]
              }
            >
              Current Process
            </Text>
            <Image source={gearIcon} />
          </View>
          <View style={styles.topRight}>
            <Image source={notificationIcon} />
          </View>
        </View>
        {currentProcess === "Shredding" && (
          <View style={styles.bottom}>
            <View style={styles.currentProcess}>
              <Text
                style={
                  Platform.OS === "ios"
                    ? styles.currentProcessText
                    : [styles.currentProcessText, { fontSize: 42 }]
                }
              >
                Shredding
              </Text>
              <ActivityIndicator
                style={styles.loading}
                size="large"
                color={colors.primary}
              />
            </View>
            <Text
              style={
                Platform.OS === "ios"
                  ? styles.pendingProcess
                  : [styles.pendingProcess, { fontSize: 23 }]
              }
            >
              Mixing
            </Text>
            <Text
              style={
                Platform.OS === "ios"
                  ? styles.pendingProcess
                  : [styles.pendingProcess, { fontSize: 23 }]
              }
            >
              Molding
            </Text>
          </View>
        )}
        {currentProcess === "Mixing" && (
          <View style={styles.bottom}>
            <View style={styles.currentProcess}>
              <Text
                style={
                  Platform.OS === "ios"
                    ? styles.currentProcessText
                    : [styles.currentProcessText, { fontSize: 42 }]
                }
              >
                Mixing
              </Text>
              <ActivityIndicator
                style={styles.loading}
                size="large"
                color={colors.primary}
              />
            </View>
            <Text
              style={
                Platform.OS === "ios"
                  ? styles.pendingProcess
                  : [styles.pendingProcess, { fontSize: 23 }]
              }
            >
              Molding
            </Text>
            <Text
              style={
                Platform.OS === "ios"
                  ? styles.pendingProcess
                  : [styles.pendingProcess, { fontSize: 23 }]
              }
            >
              Shredding
            </Text>
          </View>
        )}
        {currentProcess === "Molding" && (
          <View style={styles.bottom}>
            <View style={styles.currentProcess}>
              <Text
                style={
                  Platform.OS === "ios"
                    ? styles.currentProcessText
                    : [styles.currentProcessText, { fontSize: 42 }]
                }
              >
                Molding
              </Text>
              <ActivityIndicator
                style={styles.loading}
                size="large"
                color={colors.primary}
              />
            </View>
            <Text
              style={
                Platform.OS === "ios"
                  ? styles.pendingProcess
                  : [styles.pendingProcess, { fontSize: 23 }]
              }
            >
              Shredding
            </Text>
            <Text
              style={
                Platform.OS === "ios"
                  ? styles.pendingProcess
                  : [styles.pendingProcess, { fontSize: 23 }]
              }
            >
              Mixing
            </Text>
          </View>
        )}
        {currentProcess === "Finished" && (
          <View style={styles.others}>
            <View style={styles.rowContainer}>
              <Text style={styles.finishText}>Process Finished</Text>
              <Image source={checkIcon} />
            </View>
          </View>
        )}
        {currentProcess === "Idle" && (
          <View style={styles.others}>
            <View style={styles.rowContainer}>
              <Text style={styles.finishText}>Standby</Text>
              <Image source={standbyIcon} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Dashboard;

// ------------------------- STYLES ------------------------- //
const styles = StyleSheet.create({
  // ----- BANNER ----- //
  container: {
    flex: 1,
    backgroundColor: colors.tertiary,
    marginTop: statusBarHeight,
    alignItems: "center",
  },
  bannerContainer: {
    // height: 192,
    height: screenHeight * 0.24,
    // height: "24%",
    width: "100%",
    // borderBottomWidth: 0.5,
  },
  banner: {
    alignItems: "center",
    // height: 160,
    height: "83.33%",
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
    // width: 320,
    width: screenWidth * 0.8889,
    // width: "88.89%"
    // marginTop: 48,
    marginTop: screenHeight * 0.0619,
    // marginTop: "6.19%",
  },
  hamburgerMenu: {},
  dashboardText: {
    fontFamily: "LatoBold",
    fontSize: 39,
    color: colors.white,
  },
  tag: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // height: 56,
    height: "29.17%",
    // width: 200,
    width: "55.56%",
    // marginTop: 128,
    marginTop: screenHeight * 0.1649,
    // marginTop: "16.49%",
    backgroundColor: colors.white,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  logo: {
    marginLeft: 16,
  },
  greetingsText: {
    marginLeft: 16,
    fontFamily: "LatoBold",
    fontSize: 25,
    color: colors.black75,
  },
  // ----- WIDGETS ----- //
  widgetsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // height: 200,
    height: screenHeight * 0.25,
    // height: "25%",
    // width: 328,
    width: screenWidth * 0.9111,
    // width: "91.11%",
    // borderWidth: 0.5,
    // marginTop: 8,
    marginTop: screenHeight * 0.01,
    // marginTop: "1%"
  },
  totalBricks: {
    justifyContent: "flex-start",
    alignItems: "center",
    // height: 184,
    height: "92%",
    // width: 200,
    width: "60.98%",
    borderWidth: 0.5,
    backgroundColor: colors.primary,
    borderColor: colors.black5,
    borderRadius: 24,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  bricksMoldedText: {
    fontFamily: "LatoBold",
    fontSize: 25,
    color: colors.tertiary,
    // marginTop: 16,
    marginTop: "8.7%",
  },
  textAndIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 8,
    marginTop: "4.35%",
  },
  bricksMoldedNumber: {
    fontFamily: "LatoBold",
    fontSize: 64,
    color: colors.tertiary,
    marginRight: 16,
  },
  doubleArrowIcon: {
    // flexDirection: "row",
    alignSelf: "flex-end",
    marginRight: 16,
  },
  smallWidgetsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    // height: 200,
    height: "100%",
    // width: 112,
    width: "34.15%",
  },
  weatherToday: {
    justifyContent: "flex-start",
    alignItems: "center",
    // height: 96,
    height: "48%",
    // width: 112,
    width: "100%",
    borderWidth: 0.5,
    backgroundColor: colors.white,
    borderColor: colors.black5,
    borderRadius: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  temperature: {
    justifyContent: "flex-start",
    alignItems: "center",
    // height: 96,
    height: "48%",
    // width: 112,
    width: "100%",
    borderWidth: 0.5,
    backgroundColor: colors.white,
    borderColor: colors.black5,
    borderRadius: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  normalText: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    color: colors.black75,
    // marginTop: 8,
    marginTop: "4.35%",
  },
  bigText: {
    fontFamily: "LatoBold",
    fontSize: 39,
    color: colors.secondary,
  },
  doubleArrowSmallIcon: {
    alignSelf: "flex-end",
    marginRight: 16,
  },
  // ----- PROCESS ----- //
  processContainer: {
    // height: 232,
    height: screenHeight * 0.29,
    // height: "29%",
    // width: 328,
    width: screenWidth * 0.9111,
    // width: "91.11%",
    borderWidth: 2,
    // marginTop: 16,
    marginTop: screenHeight * 0.02,
    // marginTop: "2%",
    backgroundColor: colors.white,
    borderColor: colors.black5,
    borderRadius: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // height: 56,
    height: "24.14%",
    // width: 328,
    width: "100%",
    borderBottomWidth: 2,
    borderColor: colors.black5,
  },
  topLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    marginLeft: "4.88%",
  },
  currentProcessTitle: {
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: colors.black75,
    // marginRight: 16,
    marginRight: "4.88%",
  },
  topRight: {
    // marginRight: 16,
    marginRight: "4.88%",
  },
  bottom: {
    // marginTop: 16,
    marginTop: "6.9%",
  },
  currentProcess: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 8,
    marginBottom: "4.35%",
  },
  currentProcessText: {
    fontFamily: "LatoBold",
    fontSize: 36,
    color: colors.secondary,
    // marginLeft: 24,
    marginLeft: "7.32%",
  },
  loading: {
    marginRight: 40,
    marginRight: "12.2%",
  },
  pendingProcess: {
    fontFamily: "LatoBold",
    fontSize: 17,
    color: colors.black75,
    marginLeft: 24,
    marginLeft: "7.32%",
    // marginBottom: 4,
    marginBottom: "1.72%",
  },
  others: {
    // marginTop: 24,
    marginTop: "10.34%",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  finishText: {
    fontFamily: "LatoBold",
    fontSize: 36,
    color: colors.secondary,
    // marginRight: 16,
    marginRight: "4.88%",
  },
});
