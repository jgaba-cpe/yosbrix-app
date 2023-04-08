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

// constants
import { colors } from "../constants/Colors";
import {
  screenWidth,
  screenHeight,
  statusBarHeight,
} from "../constants/LayoutTools";

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
  shredder,
  mixer,
  molder,
  goal,
  idle,
} from "../assets/index";
import Wave from "../assets/svg/Wave";
import Hamburger from "../assets/svg/Hamburger Menu Icon.svg";
import LogoIcon from "../assets/svg/Logo Icon.svg";
import TotalBrickIcon from "../assets/svg/Total Brick Icon.svg";
import DoubleArrowTertiary from "../assets/svg/Double Arrow Tertiary.svg";
import DoubleArrowGray from "../assets/svg/Double Arrow Gray.svg";
import Gear from "../assets/svg/Gear Icon.svg";
import NotificationOn from "../assets/svg/Notifications On.svg";
import NotificationOff from "../assets/svg/Notifications Off.svg";

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

  const bannerContainerHeight = screenHeight * 0.2527;
  const bannerHeight = bannerContainerHeight * 0.869565;
  const bannerWaveHeight = bannerHeight * 0.6;

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
            <Text style={styles.dashboardText}>Dashboard</Text>
          </View>
        </View>
        <View style={styles.greetingsContainer}>
          <Text style={styles.greetingsText}>
            Hi, {user ? user.displayName : "User"}!
          </Text>
        </View>
        <View style={styles.bannerWave}>
          <Wave height={bannerWaveHeight} />
        </View>
        <View style={styles.tag}>
          <LogoIcon style={styles.yosbrixLogo} />
          <Text style={styles.yosbrixText}>YosBrix</Text>
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
            <Text style={styles.bricksMoldedNumber}>{count}</Text>
            <TotalBrickIcon />
          </View>
          <DoubleArrowTertiary style={styles.doubleArrowIcon} />
        </TouchableOpacity>
        <View style={styles.smallWidgetsContainer}>
          <TouchableOpacity
            style={styles.weatherToday}
            onPress={() => {
              navigation.navigate("Weather");
            }}
          >
            <Text style={styles.weatherNormalText}>Weather Today</Text>
            <Text style={styles.weatherBigText}>30°C</Text>
            <DoubleArrowGray style={styles.doubleArrowSmallIcon} />
          </TouchableOpacity>
          <View style={styles.temperature}>
            <Text style={styles.systemNormalText}>System Temp</Text>
            <Text style={styles.systemBigText}>{machineTemp}°C</Text>
          </View>
        </View>
      </View>
      {/* ---------------------- PROCESS ---------------------- */}
      <View style={styles.processContainer}>
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <Text style={styles.currentProcessTitle}>Current Process</Text>
            <Gear />
          </View>
          <View style={styles.topRight}>
            <NotificationOn />
          </View>
        </View>
        {currentProcess === "Shredding" && (
          <View style={styles.bottom}>
            <Text style={styles.shredderText}>Shredding</Text>
            <Image source={shredder} style={styles.shredderGif} />
          </View>
        )}
        {currentProcess === "Mixing" && (
          <View style={styles.bottom}>
            <Text style={styles.mixerText}>Mixing</Text>
            <Image source={mixer} style={styles.mixerGif} />
          </View>
        )}
        {currentProcess === "Molding" && (
          <View style={styles.bottom}>
            <Text style={styles.molderText}>Molding</Text>
            <Image source={molder} style={styles.molderGif} />
          </View>
        )}
        {currentProcess === "Finished" && (
          <View style={styles.others}>
            <Text style={styles.finishedText}>Process finished</Text>
            <Image source={goal} style={styles.finishedGif}/>
          </View>
        )}
        {currentProcess === "Idle" && (
          <View style={styles.others}>
          <Text style={styles.idleText}>No current process</Text>
          <Image source={idle} style={styles.idleGif}/>
        </View>
        )}
      </View>
    </View>
  );
};

export default Dashboard;

// ------------------------- STYLES ------------------------- //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tertiary,
    marginTop: statusBarHeight,
    alignItems: "center",
  },
  // -------------------- BANNER -------------------- //
  bannerContainer: {
    position: "relative",
    // 184 is what percent of 728 = 25.27%
    height: screenHeight * 0.2527,
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
    // 40 is what percent of 728 = 5.4945%
    marginTop: screenHeight * 0.054945,
  },
  hamburgerMenu: {},
  dashboardText: {
    fontFamily: "LatoBold",
    fontSize: 39,
    color: colors.white,
  },
  greetingsContainer: {
    position: "absolute",
    zIndex: 1,
    alignItems: "flex-end",
    // 320 is what percent of 360 = 88.89%
    width: screenWidth * 0.8889,
    // 95 is what percent of 728 = 13.05%
    top: screenHeight * 0.1305,
    // 24 is what percent of 360 = 6.67%
    right: screenWidth * 0.0667,
  },
  greetingsText: {
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: colors.white,
  },
  bannerWave: {
    position: "absolute",
    // 64 is what percent of 728 = 8.79%
    top: screenHeight * 0.0879,
  },
  tag: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // 56 is what percent of 184 = 30.43%
    height: "30.43%",
    // 186 is what percent of 360 = 51.67%
    width: "51.67%",
    // 128 is what percent of 728 = 17.58%
    top: screenHeight * 0.1758,
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
  yosbrixLogo: {
    // 16 is what percent of 186 = 8.6%
    marginLeft: "8.6%",
  },
  yosbrixText: {
    // 16 is what percent of 186 = 8.6%
    marginLeft: "8.6%",
    fontFamily: "LatoBold",
    fontSize: 25,
    color: colors.black75,
  },
  // -------------------- WIDGETS -------------------- //
  widgetsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // 200 is what percent of 728 = 27.47%
    height: screenHeight * 0.2747,
    // 328 is what percent of 360 = 91.11%
    width: screenWidth * 0.9111,
    // 16 is what percent of 728 = 2.2%
    marginTop: screenHeight * 0.022,
  },
  totalBricks: {
    justifyContent: "space-evenly",
    alignItems: "center",
    // 184 is what percent of 200 = 92%
    height: "92%",
    // 200 is what percent of 328 = 60.98%
    width: "60.98%",
    backgroundColor: colors.primary,
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
    // marginTop: "8.7%",
  },
  textAndIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 8,
    // marginTop: "4.35%",
  },
  bricksMoldedNumber: {
    fontFamily: "LatoBold",
    fontSize: 64,
    color: colors.tertiary,
    marginRight: 16,
  },
  doubleArrowIcon: {
    alignSelf: "flex-end",
    marginRight: 16,
  },
  smallWidgetsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    // 200 is what percent of 200 = 100%
    height: "100%",
    // 112 is what percent of 328 = 34.15%
    width: "34.15%",
  },
  weatherToday: {
    justifyContent: "space-evenly",
    alignItems: "center",
    // 96 is what percent of 200 = 48%
    height: "48%",
    // 112 is what percent of 112 = 100%
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
    justifyContent: "space-evenly",
    alignItems: "center",
    // 96 is what percent of 200 = 48%
    height: "48%",
    // 112 is what percent of 112 = 100%
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
  weatherNormalText: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    color: colors.black75,
  },
  weatherBigText: {
    fontFamily: "LatoBold",
    fontSize: 39,
    color: colors.secondary,
  },
  doubleArrowSmallIcon: {
    alignSelf: "flex-end",
    marginRight: 16,
  },
  systemNormalText: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    color: colors.black75,
  },
  systemBigText: {
    fontFamily: "LatoBold",
    fontSize: 39,
    color: colors.secondary,
    // 16 is what percent of 728 = 0.022%
    marginBottom: screenHeight * 0.022,
  },
  // -------------------- PROCESS -------------------- //
  processContainer: {
    // 232 is what percent of 728 = 31.87%
    // 216 is what percent of 728 = 29.67%
    // Layout Problems for Small Screens
    height: screenHeight >= 780 ? screenHeight * 0.3187 : screenHeight * 0.2967,
    // 328 is what percent of 360 = 91.11%
    width: screenWidth * 0.9111,
    // width: "91.11%",
    borderWidth: 2,
    // 16 is what percent of 728 = 2.2%
    marginTop: screenHeight * 0.022,
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
    // 56 is what percent of 232 = 24.14%
    height: "24.14%",
    // 328 is what percent of 328 = 100%
    width: "100%",
    borderBottomWidth: 2,
    borderColor: colors.black5,
  },
  topLeft: {
    flexDirection: "row",
    alignItems: "center",
    // 16 is what percent of 328 = 4.88%
    marginLeft: "4.88%",
  },
  currentProcessTitle: {
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: colors.black75,
    // 16 is what percent of 328 = 4.88%
    marginRight: "4.88%",
  },
  topRight: {
    // 16 is what percent of 328 = 4.88%
    marginRight: "4.88%",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 0.5,
  },
  shredderText: {
    fontSize: 31,
    fontFamily: "LatoBold",
    color: colors.secondary,
    // 24 is what percent of 328 = 7.32%
    marginLeft: "7.32%",
  },
  shredderGif: {
    height: 144,
    width: 144,
    // 16 is what percent of 328 = 4.88%
    marginRight: "4.88%",
  },
  mixerText: {
    fontSize: 31,
    fontFamily: "LatoBold",
    color: colors.secondary,
    // 32 is what percent of 328 = 9.756%
    marginLeft: "9.756%",
  },
  mixerGif: {
    height: 144,
    width: 144,
    // 48 is what percent of 328 = 14.63%
    marginRight: "14.63%",
  },
  molderText: {
    fontSize: 31,
    fontFamily: "LatoBold",
    color: colors.secondary,
    // 32 is what percent of 328 = 9.756%
    marginLeft: "9.756%",
  },
  molderGif: {
    height: 144,
    width: 144,
    // 48 is what percent of 328 = 14.63%
    marginRight: "14.63%",
  },
  others: {
    justifyContent: "center",
    alignItems: "center",

  },
  finishedText: {
    fontSize: 31,
    fontFamily: "LatoBold",
    color: colors.secondary,
    // 16 is what percent of 232 = 6.9%
    // 8 is what percent of 232 = 3.45%
    marginTop: screenHeight >= 780 ? "6.9%" : "3.45%",
  }, 
  finishedGif: {
    height: 104,
    width: 104,
  },
  idleText: {
    fontSize: 31,
    fontFamily: "LatoBold",
    color: colors.secondary,
    // 16 is what percent of 232 = 6.9%
    // 8 is what percent of 232 = 3.45%
    marginTop: screenHeight >= 780 ? "6.9%" : "3.45%",
  }, 
  idleGif: {
    height: 104,
    width: 104,
  }
});
