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
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

// navigation
import { useNavigation } from "@react-navigation/native";

// HTTP library
import axios from "axios";

// ENV
import { OPENWEATHER_API_KEY } from "@env";

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
import { shredder, mixer, molder, goal, idle } from "../assets/index";
import Wave from "../assets/svg/Wave";
import Hamburger from "../assets/svg/Hamburger Menu Icon.svg";
import LogoIcon from "../assets/svg/Logo Icon.svg";
import TotalBrickIcon from "../assets/svg/Total Brick Icon.svg";
import DoubleArrowTertiary from "../assets/svg/Double Arrow Tertiary.svg";
import DoubleArrowGray from "../assets/svg/Double Arrow Gray.svg";
import Gear from "../assets/svg/Gear Icon.svg";
import NotificationOn from "../assets/svg/Notifications On.svg";
import NotificationOff from "../assets/svg/Notifications Off.svg";
import Arrow from "../assets/svg/Arrow.svg";
import Manual from "../assets/svg/Manual-DashboardIcon.svg";
import Start from "../assets/svg/Start Icon.svg";
import Stop from "../assets/svg/Stop Icon.svg";
import Error from "../assets/svg/Error Icon.svg";
import Alert from "../assets/svg/Alert Icon.svg";
import Inform from "../assets/svg/Inform Icon.svg";
import Scan from "../assets/svg/Scan Icon.svg";
import ProcessFinished from "../assets/svg/Process Finished Icon.svg";

// animations
import { MotiView } from "moti";

// ------------------------- MAIN CODE ------------------------- //
const Dashboard = () => {
  const [count, setCount] = useState(0);
  const [currentProcess, setCurrentProcess] = useState("");
  const [moldedBricks, setMoldedBricks] = useState("");
  const [notification, setNofication] = useState(true);

  const [state, setState] = useState("");
  const [signal, setSignal] = useState("");
  const [startingError, setStartingError] = useState("");
  const [clearStartingErrorSignal, setClearStartingErrorSignal] = useState("");
  const [dispensingError, setDispensingError] = useState("");
  const [clearDispensingErrorSignal, setClearDispensingErrorSignal] =
    useState("");
  const [qualityChecking, setQualityChecking] = useState("");
  const [qualityCheckingResult, setQualityCheckingResult] = useState("");

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Local Notification
  const { showNotification } = useLocalNotification();

  // Getting the current date
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  console.log(currentDate);

  // Read "Counter/numberOfBricks", "Process/currentProcess" "Molder/moldedBricks" data from RTDB
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

    const molderRef = rtdb.ref("machine/" + "Molder/");
    molderRef.on("value", (snapshot) => {
      const molderData = snapshot.val();
      setMoldedBricks(molderData.moldedBricks);
    });
  }, []);

  useEffect(() => {
    const stateRef = rtdb.ref("machine/" + "Machine/");
    stateRef.on("value", (snapshot) => {
      const stateData = snapshot.val();
      setState(stateData.state);
    });

    const signalRef = rtdb.ref("machine/" + "Machine/");
    signalRef.on("value", (snapshot) => {
      const signalData = snapshot.val();
      setSignal(signalData.signal);
    });

    const startingErrorRef = rtdb.ref("machine/" + "Error/");
    startingErrorRef.on("value", (snapshot) => {
      const startingErrorData = snapshot.val();
      setStartingError(startingErrorData.startingError);
    });

    const clearStartingErrorSignalRef = rtdb.ref("machine/" + "Error/");
    clearStartingErrorSignalRef.on("value", (snapshot) => {
      const clearStartingErrorSignalData = snapshot.val();
      setClearStartingErrorSignal(
        clearStartingErrorSignalData.clearStartingErrorSignal
      );
    });

    const dispensingErrorRef = rtdb.ref("machine/" + "Error/");
    dispensingErrorRef.on("value", (snapshot) => {
      const dispensingErrorData = snapshot.val();
      setDispensingError(dispensingErrorData.dispensingError);
    });

    const clearDispensingErrorSignalRef = rtdb.ref("machine/" + "Error/");
    clearDispensingErrorSignalRef.on("value", (snapshot) => {
      const clearDispensingErrorSignalData = snapshot.val();
      setClearStartingErrorSignal(
        clearDispensingErrorSignalData.clearDispensingErrorSignal
      );
    });

    const qualityCheckingRef = rtdb.ref("machine/" + "RPI/");
    qualityCheckingRef.on("value", (snapshot) => {
      const qualityCheckingData = snapshot.val();
      setQualityChecking(qualityCheckingData.qualityChecking);
    });

    const qualityCheckingResultRef = rtdb.ref("machine/" + "RPI/");
    qualityCheckingResultRef.on("value", (snapshot) => {
      const qualityCheckingResultData = snapshot.val();
      setQualityCheckingResult(qualityCheckingResultData.qualityCheckingResult);
    });
  }, []);

  // Condition for determining the number of bricks to be added
  const molderBricksValidator = (moldedBricks) => {
    let finishedProduct;
    if (moldedBricks === "2/2") {
      finishedProduct = 2;
    }
    if (moldedBricks === "1/2") {
      finishedProduct = 1;
    }
    if (moldedBricks === "0/2") {
      finishedProduct = 0;
    }
    return finishedProduct;
  };

  // Update the "Counter/numberOfBricks" data in RTDB
  const updateCounter = (moldedBricks) => {
    const finishedProduct = molderBricksValidator(moldedBricks);

    const counterRef = rtdb.ref("machine/" + "Counter/" + "numberOfBricks");
    counterRef.transaction((currentCount) => {
      return (currentCount || 0) + finishedProduct;
    });
  };

  // Update the "History/`${currentDate}`/currentDate" and "History/`${currentDate}`/numberOfBricks" data in RTDB
  const updateHistory = (moldedBricks) => {
    const finishedProduct = molderBricksValidator(moldedBricks);

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
      return (currentCount || 0) + finishedProduct;
    });
  };

  // Update the "Process/currentProcess" data in RTDB
  const updateProcessToIdle = () => {
    const processRef = rtdb.ref("machine/" + "Process/" + "currentProcess");
    processRef.transaction((currentProcess) => {
      return (currentProcess = "Idle");
    });
  };

  // Update the "Molder/moldedBricks" data in RTDB
  const resetMoldedBricks = () => {
    const molderRef = rtdb.ref("machine/" + "Molder/" + "moldedBricks");
    molderRef.transaction((moldedBricks) => {
      return (moldedBricks = "0/2");
    });
  };

  const sendStartSignal = () => {
    const signalRef = rtdb.ref("machine/" + "Machine/" + "signal");
    signalRef.transaction((currentValue) => {
      return (currentValue = "Start");
    });
  };

  const sendStopSignal = () => {
    const signalRef = rtdb.ref("machine/" + "Machine/" + "signal");
    signalRef.transaction((currentValue) => {
      return (currentValue = "Stop");
    });
  };

  const resetStartingError = () => {
    const startingErrorRef = rtdb.ref("machine/" + "Error/" + "startingError");
    startingErrorRef.transaction((currentValue) => {
      return (currentValue = "None");
    });

    const clearStartingErrorSignalRef = rtdb.ref(
      "machine/" + "Error/" + "clearStartingErrorSignal"
    );
    clearStartingErrorSignalRef.transaction((currentValue) => {
      return (currentValue = "Clear");
    });
  };

  const resetDispensingError = () => {
    const dispensingErrorRef = rtdb.ref(
      "machine/" + "Error/" + "dispensingError"
    );
    dispensingErrorRef.transaction((currentValue) => {
      return (currentValue = "None");
    });

    const clearDispensingErrorSignalRef = rtdb.ref(
      "machine/" + "Error/" + "clearDispensingErrorSignal"
    );
    clearDispensingErrorSignalRef.transaction((currentValue) => {
      return (currentValue = "Clear");
    });
  };

  const sendQualityCheckingStartSignal = () => {
    const qualityCheckingRef = rtdb.ref(
      "machine/" + "RPI/" + "qualityChecking"
    );
    qualityCheckingRef.transaction((currentValue) => {
      return (currentValue = "Start");
    });
  };

  const resetQualityCheckingResult = () => {
    const qualityCheckingResultRef = rtdb.ref(
      "machine/" + "RPI/" + "qualityCheckingResult"
    );
    qualityCheckingResultRef.transaction((currentValue) => {
      return (currentValue = "None");
    });

    const clearQualityCheckingResultRef = rtdb.ref(
      "machine/" + "RPI/" + "clearQualityCheckingResult"
    );
    clearQualityCheckingResultRef.transaction((currentValue) => {
      return (currentValue = "Clear");
    });
  };

  // Algo
  useEffect(() => {
    if (currentProcess === "Shredding" && notification === true) {
      showNotification("Shredding has started.");
    }

    if (currentProcess === "Mixing" && notification === true) {
      showNotification("Shredding is finished. Mixing has started.");
    }

    if (currentProcess === "Dispensing" && notification === true) {
      showNotification("Mixing is finished. Dispensing has started.");
    }

    if (currentProcess === "Transferring" && notification === true) {
      showNotification("Dispensing is finished. Transferring has started.");
    }

    if (currentProcess === "Molding" && notification === true) {
      showNotification("Transferring is finished. Molding has started.");
    }

    if (currentProcess === "Finished") {
      if (notification === true) {
        showNotification("Molding is finished. All processes are complete.");
      }
      updateCounter(moldedBricks);
      updateHistory(moldedBricks);
      setTimeout(updateProcessToIdle, 3000);
      resetMoldedBricks();
    }
  }, [currentProcess]);

  // fetching current weather data in OpenAPI
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Quezon City&appid=${OPENWEATHER_API_KEY}`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

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

  function startErrorDecoder(keys) {
    const startingErrorObject = {
      A: "Enough cigarette butts in the container",
      1: "Not enough cigarette butts in the container",
      2: "No cigarette butts in the container",
      B: "The mixer door is closed",
      3: "The mixer door is not closed",
      C: "Enough clay in the mixer",
      4: "Not enough clay in the mixer",
      5: "No clay in the container",
    };

    const result = [];
    const forbiddenKeys = ["A", "B", "C"];

    if (keys !== "None") {
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!forbiddenKeys.includes(key)) {
          result.push(startingErrorObject[key]);
        }
      }

      console.log(result);
    }

    return result;
  }

  function dispenseErrorDecoder(keys) {
    const dispenseErrorObject = {
      A: "Enough clay on Molder 2",
      1: "Not enough clay on Molder 2",
      2: "No clay on Molder 2",
      B: "Enough clay on Molder 1",
      3: "Not enough clay on Molder 1",
      4: "No clay on Molder 1",
    };

    const result = [];
    const forbiddenKeys = ["A", "B"];

    if (keys !== "None") {
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!forbiddenKeys.includes(key)) {
          result.push(dispenseErrorObject[key]);
        }
      }

      console.log(result);
    }

    return result;
  }

  function qualityCheckingResultDecoder(keys) {
    const qualityCheckingResultObject = {
      1: "Molded Brick No.1: Good Quality",
      2: "Molded Brick No.1: Bad Quality",
      3: "Molded Brick No.2: Good Quality",
      4: "Molded Brick No.2: Bad Quality",
    };

    const result = [];

    if (keys !== "None") {
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        result.push(qualityCheckingResultObject[key]);
      }

      console.log(result);
    }

    return result;
  }

  return (
    <View style={styles.container}>
      {Platform.OS === "android" && (
        <StatusBar style="dark" backgroundColor={colors.white} />
      )}
      {Platform.OS === "ios" && <StatusBar style="dark" />}

      {/* ---------------------- MODALS ---------------------- */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={
          qualityCheckingResult !== "None" && qualityCheckingResult !== ""
        }
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.summaryModalContainer}>
            <ProcessFinished style={styles.summaryIcon} />
            <View style={styles.summaryTitle}>
              <Text style={styles.summaryTitleText}>Process Finished</Text>
            </View>
            <View style={styles.summarySubtitle}>
              <Text style={styles.summarySubTitleText}>Summary</Text>
            </View>
            <View style={styles.summaryContent}>
              {qualityCheckingResultDecoder(qualityCheckingResult).map(
                (result) => (
                  <Text style={styles.summaryContentText}>{result}</Text>
                )
              )}
            </View>
            <TouchableOpacity
              style={styles.summaryButton}
              onPress={() => resetQualityCheckingResult()}
            >
              <Text style={styles.summaryButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={
          startingError !== "None" &&
          startingError !== "ABC" &&
          startingError !== ""
        }
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeaderContainer}>
              <Error />
            </View>
            <View style={styles.modalBodyContainer}>
              <View style={styles.errorTitle}>
                <Text style={styles.errorTitleText}>ERROR!</Text>
                <Text style={styles.errorSubTitleText}>
                  The system will not start, the following error has been
                  detected:
                </Text>
              </View>
              <View style={styles.errorContent}>
                {startErrorDecoder(startingError).map((error) => (
                  <Text style={styles.errorContentText}>{error}</Text>
                ))}
              </View>
              <TouchableOpacity
                style={styles.errorButton}
                onPress={() => resetStartingError()}
              >
                <Text style={styles.errorButtonText}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={
          dispensingError !== "None" &&
          dispensingError !== "AB" &&
          dispensingError !== ""
        }
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeaderContainer}>
              <Alert />
            </View>
            <View style={styles.modalBodyContainer}>
              <View style={styles.alertTitle}>
                <Text style={styles.alertTitleText}>
                  The dispensing process will restart.
                </Text>
              </View>
              <Text style={styles.alertSubTitleText}>
                The system has detected the following error:
              </Text>
              <View style={styles.alertContent}>
                {dispenseErrorDecoder(dispensingError).map((error) => (
                  <Text style={styles.alertContentText}>{error}</Text>
                ))}
              </View>
              <TouchableOpacity
                style={styles.alertButton}
                onPress={() => resetDispensingError()}
              >
                <Text style={styles.alertButtonText}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={qualityChecking === "Wait"}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeaderContainer}>
              <Inform />
            </View>
            <View style={styles.modalBodyContainer}>
              <View style={styles.informTitle}>
                <Text style={styles.informTitleText}>
                  Please unlock the molder before starting the checking process.
                </Text>
              </View>
              <View style={styles.informContent}>
                <Text style={styles.informContentText}>
                  "Click the start button to begin"
                </Text>
              </View>
              <TouchableOpacity
                style={styles.informButton}
                onPress={() => sendQualityCheckingStartSignal()}
              >
                <Text style={styles.informButtonText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 750 }}
          style={styles.greetingsContainer}
        >
          <Text style={styles.greetingsText}>
            Hi, {user ? user.displayName : "User"}!
          </Text>
        </MotiView>
        <View style={styles.bannerWave}>
          <Wave height={bannerWaveHeight} />
        </View>
        <MotiView
          from={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 750 }}
          style={styles.tag}
        >
          <LogoIcon style={styles.yosbrixLogo} />
          <Text style={styles.yosbrixText}>YosBrix</Text>
        </MotiView>
      </View>
      {/* ---------------------- WIDGETS ---------------------- */}
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 500 }}
        style={styles.widgetsContainer}
      >
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
            {!loading ? (
              <Text style={styles.weatherBigText}>
                {Math.round(weatherData?.main.temp - 273.15)}°C
              </Text>
            ) : (
              <ActivityIndicator size="small" />
            )}
            <DoubleArrowGray style={styles.doubleArrowSmallIcon} />
          </TouchableOpacity>
          {/* START and STOP button */}
          {state === "Stopped" && (
            <TouchableOpacity
              style={styles.start}
              onPress={() => sendStartSignal()}
            >
              <Text style={styles.startNormalText}>Start the Machine</Text>
              <Start />
            </TouchableOpacity>
          )}
          {state === "Started" && (
            <TouchableOpacity
              style={styles.stop}
              onPress={() => sendStopSignal()}
            >
              <Text style={styles.stopNormalText}>Stop the Machine</Text>
              <Stop />
            </TouchableOpacity>
          )}
        </View>
      </MotiView>
      {/* ---------------------- PROCESS ---------------------- */}
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 750 }}
        style={styles.processContainer}
      >
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <Text style={styles.currentProcessTitle}>Current Process</Text>
            <Gear />
          </View>
          <View style={styles.topRight}>
            <TouchableOpacity onPress={() => setNofication(!notification)}>
              {notification ? <NotificationOn /> : <NotificationOff />}
            </TouchableOpacity>
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
        {currentProcess === "Dispensing" && (
          <View style={styles.others}>
            <Text style={styles.othersText}>Dispensing</Text>
            <View style={styles.othersGifContainer}>
              <Image source={mixer} style={styles.dispensingGif1} />
              <Arrow />
              <Image source={molder} style={styles.dispensingGif2} />
            </View>
          </View>
        )}
        {currentProcess === "Transferring" && (
          <View style={styles.others}>
            <Text style={styles.othersText}>Transferring</Text>
            <View style={styles.othersGifContainer}>
              <Image source={mixer} style={styles.dispensingGif1} />
              <Arrow />
              <Image source={molder} style={styles.dispensingGif2} />
            </View>
          </View>
        )}
        {currentProcess === "Molding" && (
          <View style={styles.bottom}>
            <Text style={styles.molderText}>Molding</Text>
            <Image source={molder} style={styles.molderGif} />
          </View>
        )}
        {currentProcess === "TransferringToChecking" && (
          <View style={styles.others}>
            <Text style={styles.checkingText}>Transferring</Text>
            <Scan />
          </View>
        )}
        {currentProcess === "Checking1" && (
          <View style={styles.others}>
            <Text style={styles.checkingText}>Checking Molder 1:</Text>
            <Scan />
          </View>
        )}
        {currentProcess === "Checking2" && (
          <View style={styles.others}>
            <Text style={styles.checkingText}>Checking Molder 2:</Text>
            <Scan />
          </View>
        )}
        {currentProcess === "Checking" && (
          <View style={styles.others}>
            <Text style={styles.checkingText1}>Checking Molded</Text>
            <Text style={styles.checkingText2}>Brick Quality</Text>
            <Scan />
          </View>
        )}
        {currentProcess === "Finished" && (
          <View style={styles.others}>
            <Text style={styles.finishedText}>Process finished</Text>
            <Image source={goal} style={styles.finishedGif} />
          </View>
        )}
        {currentProcess === "Idle" && (
          <View style={styles.others}>
            <Text style={styles.idleText}>No current process</Text>
            <Image source={idle} style={styles.idleGif} />
          </View>
        )}
      </MotiView>
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
  // -------------------- MODAL -------------------- //
  modalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    alignItems: "center",
    // 280 is what percent of 728 = 38.46%
    height: screenHeight * 0.3846,
    // 280 is what percent of 360 = 77.78%
    width: screenWidth * 0.7778,
    backgroundColor: colors.offwhite,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    // 56 is what percent of 280 = 20%
    height: "20%",
    width: "100%",
    backgroundColor: colors.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalBodyContainer: {
    alignItems: "center",
    // 224 is what percent of 280 = 80%
    height: "80%",
    width: "100%",
    backgroundColor: colors.offwhite,
    borderColor: colors.primary,
    borderWidth: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  summaryModalContainer: {
    alignItems: "center",
    // 280 is what percent of 728 = 38.46%
    height: screenHeight * 0.3846,
    // 280 is what percent of 360 = 77.78%
    width: screenWidth * 0.7778,
    backgroundColor: colors.offwhite,
    borderColor: colors.yellow,
    borderWidth: 2,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  summaryIcon: {
    marginTop: 16,
  },
  summaryTitle: {
    alignItems: "center",
    // 224 is what percent of 280 = 80%
    width: "80%",
    // borderColor: colors.black50,
    // borderWidth: 0.5,
  },
  summarySubtitle: {
    alignItems: "center",
    // borderColor: colors.black50,
    // borderWidth: 0.5,
    marginTop: 24,
  },
  summaryTitleText: {
    fontFamily: "LatoBold",
    fontSize: 20,
    color: colors.primary,
  },
  summaryContent: {
    alignItems: "center",
    // 32 is what percent of 280 = 11.43%
    height: "11.43%",
    // 266 is what percent of 280 = 95%
    width: "95%",
    // borderColor: colors.black50,
    // borderWidth: 0.5,
    marginTop: 8,
  },
  summarySubTitleText: {
    textAlign: "center",
    fontFamily: "LatoRegular",
    fontSize: 14,
    color: colors.secondary,
  },
  summaryContentText: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    color: colors.black75,
  },
  summaryButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    // 24 is what percent of 224 = 10.71%
    height: "10.71%",
    // 160 is what percent of 224 = 71.43%
    width: "71.43%",
    borderRadius: 4,
    marginTop: 32,
  },
  summaryButtonText: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    color: colors.offwhite,
  },

  errorTitle: {
    alignItems: "center",
    // 224 is what percent of 280 = 80%
    width: "80%",
    // borderColor: colors.black50,
    // borderWidth: 0.5,
    marginTop: 24,
  },
  errorTitleText: {
    fontFamily: "LatoBold",
    fontSize: 20,
    color: colors.primary,
  },
  errorSubTitleText: {
    textAlign: "center",
    fontFamily: "LatoRegular",
    fontSize: 12,
    color: colors.secondary,
    marginTop: 8,
  },
  errorContent: {
    alignItems: "center",
    // 56 is what percent of 280 = 20%
    height: "20%",
    // 266 is what percent of 280 = 95%
    width: "95%",
    // borderColor: colors.black50,
    // borderWidth: 0.5,
    marginTop: 24,
  },
  errorContentText: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    color: colors.black75,
  },
  errorButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    // 24 is what percent of 224 = 10.71%
    height: "10.71%",
    // 160 is what percent of 224 = 71.43%
    width: "71.43%",
    borderRadius: 4,
    marginTop: 32,
  },
  errorButtonText: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    color: colors.offwhite,
  },

  alertTitle: {
    alignItems: "center",
    // 208 is what percent of 280 = 74.29%
    width: "74.29%",
    // borderColor: colors.black50,
    // borderWidth: 0.5,
    marginTop: 24,
  },
  alertSubTitleText: {
    textAlign: "center",
    fontFamily: "LatoRegular",
    fontSize: 12,
    color: colors.secondary,
    marginTop: 8,
  },
  alertTitleText: {
    textAlign: "center",
    fontFamily: "LatoBold",
    fontSize: 20,
    color: colors.primary,
  },
  alertContent: {
    alignItems: "center",
    // 32 is what percent of 280 = 11.43%
    height: "11.43%",
    // borderColor: colors.black50,
    // borderWidth: 0.5,
    marginTop: 24,
  },
  alertContentText: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    color: colors.black75,
  },
  alertButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    // 24 is what percent of 224 = 10.71%
    height: "10.71%",
    // 160 is what percent of 224 = 71.43%
    width: "71.43%",
    borderRadius: 4,
    marginTop: 34,
  },
  alertButtonText: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    color: colors.offwhite,
  },

  informTitle: {
    alignItems: "center",
    // 208 is what percent of 280 = 74.29%
    width: "74.29%",
    // borderColor: colors.black50,
    // borderWidth: 0.5,
    marginTop: 24,
  },
  informTitleText: {
    textAlign: "center",
    fontFamily: "LatoBold",
    fontSize: 20,
    color: colors.primary,
  },
  informContent: {
    alignItems: "center",
    // borderColor: colors.black50,
    // borderWidth: 0.5,
    marginTop: 32,
  },
  informContentText: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    color: colors.black75,
  },
  informButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    // 24 is what percent of 224 = 10.71%
    height: "10.71%",
    // 160 is what percent of 224 = 71.43%
    width: "71.43%",
    borderRadius: 4,
    marginTop: 40,
  },
  informButtonText: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    color: colors.offwhite,
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
  weatherNormalText: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    color: colors.black75,
    marginTop: "4.17%",
  },
  weatherBigText: {
    fontFamily: "LatoBold",
    fontSize: 39,
    color: colors.secondary,
  },
  start: {
    // justifyContent: "space-evenly",
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
  startNormalText: {
    fontFamily: "LatoRegular",
    fontSize: 11,
    color: colors.black75,
    marginTop: "8.33%",
    marginBottom: "4.17%",
  },
  stop: {
    // justifyContent: "space-evenly",
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
  stopNormalText: {
    fontFamily: "LatoRegular",
    fontSize: 11,
    color: colors.black75,
    marginTop: "8.33%",
    marginBottom: "4.17%",
  },
  doubleArrowSmallIcon: {
    alignSelf: "flex-end",
    marginRight: 16,
    marginBottom: "4.17%",
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
  othersText: {
    fontSize: 31,
    fontFamily: "LatoBold",
    color: colors.secondary,
    // 16 is what percent of 232 = 6.9%
    // 8 is what percent of 232 = 3.45%
    marginTop: screenHeight >= 780 ? "6.9%" : "3.45%",
  },
  othersGifContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    // borderWidth: 0.5
  },
  dispensingGif1: {
    height: 104,
    width: 104,
    // 48 is what percent of 328 = 14.63%
    // marginRight: "14.63%",
  },
  dispensingGif2: {
    height: 104,
    width: 104,
    // 48 is what percent of 328 = 14.63%
    // marginRight: "14.63%",
  },
  checkingText: {
    fontSize: 31,
    fontFamily: "LatoBold",
    color: colors.secondary,
    // 16 is what percent of 232 = 6.9%
    // 8 is what percent of 232 = 3.45%
    marginTop: screenHeight >= 780 ? "6.9%" : "3.45%",
    marginBottom: 16,
  },
  checkingText1: {
    fontSize: 25,
    fontFamily: "LatoBold",
    color: colors.secondary,
    // 16 is what percent of 232 = 6.9%
    // 8 is what percent of 232 = 3.45%
    // marginTop: screenHeight >= 780 ? "6.9%" : "3.45%",
    marginTop: 16,
  },
  checkingText2: {
    fontSize: 25,
    fontFamily: "LatoBold",
    color: colors.secondary,
    // 16 is what percent of 232 = 6.9%
    // 8 is what percent of 232 = 3.45%
    // marginTop: screenHeight >= 780 ? "6.9%" : "3.45%",
    marginTop: 8,
    marginBottom: 8,
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
  },
});
