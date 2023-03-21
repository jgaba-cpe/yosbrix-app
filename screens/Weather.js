// layout
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

// navigation
import { useNavigation } from "@react-navigation/native";

// HTTP library
import axios from "axios";

// utilities
import { colors } from "../utilities/Colors";
import {
  screenWidth,
  screenHeight,
  statusBarHeight,
} from "../utilities/LayoutTools";

// assets
import {
  hamburgerMenuBrownIcon,
  airPressureIcon,
  windIcon,
  humidityIcon,
  visibilityIcon,
} from "../assets/index";

// ------------------------- MAIN CODE ------------------------- //
const ApiKey = "58af3ec6f575be73277e281a2233f34e";

const Weather = () => {
  const [cityName, setCityName] = useState("Quezon City");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${ApiKey}`
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

  console.log(weatherData);
  console.log(weatherData?.main.temp - 273.15); // celcius
  console.log(weatherData?.name); // City

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
        <Text style={styles.txtTitle}>Weather Today</Text>
      </View>
      <View style={styles.weatherContainer}>
        {!loading ? (
          <>
            <Text style={styles.city}>{weatherData?.name}, PH</Text>
            <Text style={styles.temp}>
              {Math.round(weatherData?.main.temp - 273.15)} °C
            </Text>
            <View style={styles.tempMainContainer}>
              <View style={styles.tempMinContainer}>
                <Text style={styles.txtMinMax}>Min Temp: </Text>
                <Text style={styles.txtMinMax}>
                  {Math.round(weatherData?.main.temp_min - 273.15)} °C
                </Text>
              </View>
              <View style={styles.tempMinContainer}>
                <Text style={styles.txtMinMax}>Max Temp: </Text>
                <Text style={styles.txtMinMax}>
                  {Math.round(weatherData?.main.temp_max - 273.15)} °C
                </Text>
              </View>
            </View>
          </>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
      <View style={styles.featureContainer}>
        <View style={styles.rowContainer}>
          {!loading ? (
            <>
              <Text style={styles.txtFeaturesTitle}> Wind Status</Text>
              <Image style={styles.imgWeather} source={windIcon} />
              <Text style={styles.txtFeatures}>
                {Math.round(weatherData?.wind.speed)} km/hr
              </Text>
            </>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
        <View style={styles.rowContainer}>
          {!loading ? (
            <>
              <Text style={styles.txtFeaturesTitle}> Humidity</Text>
              <Image style={styles.imgWeather} source={humidityIcon} />
              <Text style={styles.txtFeatures}>
                {Math.round(weatherData?.main.humidity)}%
              </Text>
            </>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
      </View>
      <View style={styles.featureContainer}>
        <View style={styles.rowContainer}>
          {!loading ? (
            <>
              <Text style={styles.txtFeaturesTitle}> Air Pressure</Text>
              <Image style={styles.imgWeather} source={airPressureIcon} />
              <Text style={styles.txtFeatures}>
                {Math.round(weatherData?.main.pressure)}
              </Text>
            </>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
        <View style={styles.rowContainer}>
          {!loading ? (
            <>
              <Text style={styles.txtFeaturesTitle}> Visibility</Text>
              <Image style={styles.imgWeather} source={visibilityIcon} />
              <Text style={styles.txtFeatures}>
                {Math.round(weatherData?.visibility)} mb
              </Text>
            </>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
      </View>
    </View>
  );
};

export default Weather;

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
  weatherContainer: {
    alignSelf: "center",
    // marginTop: 24,
    // marginTop: "2.06%",
    marginTop: screenHeight * 0.0206,
    // height: 280,
    height: screenHeight * 0.3608,
    // height: "36.08%",
    // width: 297,
    width: screenWidth * 0.825,
    // width: "82.5%",
    borderWidth: 0.5,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderColor: colors.black5,
    borderWidth: 1,
  },
  tempMainContainer: {
    alignSelf: "center",
    // height: 80,
    height: "28.57%",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    flexDirection: "row",
    // backgroundColor: colors.white
  },
  tempMinContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  tempMaxContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  featureContainer: {
    alignSelf: "center",
    // marginTop: 24,
    // marginTop: "2.06%",
    marginTop: screenHeight * 0.0206,
    // borderWidth: 0.5,
    // height: 400,
    height: screenHeight * 0.124,
    // height: "41.24%",
    // width: 297,
    width: screenWidth * 0.825,
    // width: "82.5%",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  rowContainer: {
    alignSelf: "center",
    // height: 400,
    height: screenHeight * 0.13,
    // height: "41.24%",
    // width: 297,
    width: screenWidth * 0.325,
    // width: "82.5%",
    borderWidth: 0.5,
    backgroundColor: colors.tempColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderColor: colors.black5,
    borderWidth: 1,
  },
  imgWeather: {
    height: 50,
    width: 50,
    resizeMode: "contain",
    alignItems: "center",
  },
  city: {
    fontSize: 28,
    fontFamily: "LatoRegular",
    color: colors.tertiary,
    // marginTop: 40,
    marginTop: "14.29%",
  },
  temp: {
    fontSize: 116,
    fontFamily: "LatoBold",
    color: colors.tertiary,
    // marginTop: 8,
    marginTop: "2.86%",
  },
  txtMinMax: {
    fontSize: 16,
    fontFamily: "LatoBold",
    color: colors.tertiary,
  },
  txtFeaturesTitle: {
    fontSize: 16,
    fontFamily: "LatoBold",
    color: colors.tempText,
  },
  txtFeatures: {
    fontSize: 16,
    fontFamily: "LatoRegular",
    color: colors.tempText,
  },
});
