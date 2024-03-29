// layout
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import Swiper from "react-native-swiper";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

// navigation
import { useNavigation } from "@react-navigation/native";

// HTTP library
import axios from "axios";

// ENV
import { OPENWEATHER_API_KEY } from "@env";

// constants
import { colors } from "../constants/Colors";
import {
  screenWidth,
  screenHeight,
  statusBarHeight,
} from "../constants/LayoutTools";

// assets
import Wave from "../assets/svg/Wave";
import Hamburger from "../assets/svg/Hamburger Menu Icon.svg";
import WindStatus from "../assets/svg/Wind Status Icon.svg";
import Humidity from "../assets/svg/Humidity Icon.svg";
import AirPressure from "../assets/svg/Air Pressure Icon.svg";
import Visibility from "../assets/svg/Visibility Icon.svg";
import Search from "../assets/svg/Search Icon.svg";

// ------------------------- MAIN CODE ------------------------- //
const Weather = () => {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Forecast
  const [forecast, setForecast] = useState(null);

  const navigation = useNavigation();

  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OPENWEATHER_API_KEY}`
      );
      setWeatherData(response.data);
      const forecastData = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${OPENWEATHER_API_KEY}`
      );
      setForecast(forecastData.data.list.slice(0, 3)); // Get the first 3-hour forecast
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData("Quezon City");
  }, []);

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
            <Text style={styles.weatherTodayText}>Weather Today</Text>
          </View>
        </View>
        <View style={styles.temperatureContainer}>
          {!loading ? (
            <>
              <Text style={styles.temperatureText}>
                {Math.round(weatherData?.main.temp - 273.15)}°C
              </Text>
              {weatherData && weatherData.weather && weatherData.weather[0] && (
                <Image
                  style={styles.weatherTodayIconImg}
                  source={{
                    uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
                  }}
                />
              )}
            </>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
        <View style={styles.bannerWave}>
          <Wave height={bannerWaveHeight} />
        </View>
      </View>
      {/* ---------------------- SEARCH ---------------------- */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder={"Search for a City (e.g. Marikina)"}
          value={cityName}
          onChangeText={(text) => setCityName(text)}
        />
        <TouchableOpacity onPress={() => fetchWeatherData(cityName)}>
          <Search />
        </TouchableOpacity>
      </View>
      {/* ---------------------- WEATHER MAIN ---------------------- */}
      <View style={styles.weatherContainer}>
        {weatherData ? (
          <>
            <View style={styles.columnContainer}>
              {!loading ? (
                <>
                  <Text style={styles.city}>
                    {weatherData?.name}, {weatherData?.sys.country}
                  </Text>

                  <View style={styles.weatherTxtContainer}>
                    <Text style={styles.temp}>
                      {Math.round(weatherData?.main.temp - 273.15)}°C
                    </Text>
                  </View>

                  <View style={styles.weatherTxtContainer}>
                    <Text style={styles.txtRegular}>Feels like </Text>
                    <Text style={styles.txtRegular}>
                      {Math.round(weatherData?.main.feels_like - 273.15)}°C
                    </Text>
                  </View>

                  <View style={styles.tempMainContainer}>
                    <View style={styles.tempMinMaxContainer}>
                      <Text style={styles.txtRegular}>Min Temp: </Text>
                      <Text style={styles.txtRegular}>
                        {Math.round(weatherData?.main.temp_min - 273.15)}°C
                      </Text>
                    </View>
                    <Text style={styles.txtRegular}>|</Text>
                    <View style={styles.tempMinMaxContainer}>
                      <Text style={styles.txtRegular}>Max Temp: </Text>
                      <Text style={styles.txtRegular}>
                        {Math.round(weatherData?.main.temp_max - 273.15)}°C
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                <ActivityIndicator size="large" />
              )}
            </View>
          </>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>

      <Swiper showsButtons={true}>
        {/* ------------ WEATHER MAIN FIRST SCREEN ------------ */}
        <View style={styles.featureMainContainer}>
          <View style={styles.row1Container}>
            <View style={styles.columnContainer}>
              <View style={styles.redContainer}>
                <Text style={styles.txtFeaturesTitle}>Wind Status</Text>
              </View>
              <View style={styles.whiteContainer}>
                {!loading ? (
                  <>
                    <View style={styles.txtRowContainer}>
                      <WindStatus />
                      <Text style={styles.txtFeatures}>
                        {Math.round(weatherData?.wind.speed)} km/hr
                      </Text>
                    </View>
                  </>
                ) : (
                  <ActivityIndicator size="large" />
                )}
              </View>
            </View>

            <View style={styles.columnContainer}>
              <View style={styles.redContainer}>
                <Text style={styles.txtFeaturesTitle}>Humidity</Text>
              </View>
              <View style={styles.whiteContainer}>
                {!loading ? (
                  <>
                    <View style={styles.txtRowContainer}>
                      <Humidity />
                      <Text style={styles.txtFeatures}>
                        {Math.round(weatherData?.main.humidity)}%
                      </Text>
                    </View>
                  </>
                ) : (
                  <ActivityIndicator size="large" />
                )}
              </View>
            </View>
          </View>

          {/* 2nd row other weather info */}
          <View style={styles.row2Container}>
            <View style={styles.columnContainer}>
              <View style={styles.redContainer}>
                <Text style={styles.txtFeaturesTitle}>Air Pressure</Text>
              </View>
              <View style={styles.whiteContainer}>
                {!loading ? (
                  <>
                    <View style={styles.txtRowContainer}>
                      <AirPressure />
                      <Text style={styles.txtFeatures}>
                        {Math.round(weatherData?.main.pressure)} hPa
                      </Text>
                    </View>
                  </>
                ) : (
                  <ActivityIndicator size="large" />
                )}
              </View>
            </View>

            <View style={styles.columnContainer}>
              <View style={styles.redContainer}>
                <Text style={styles.txtFeaturesTitle}>Visibility</Text>
              </View>
              <View style={styles.whiteContainer}>
                {!loading ? (
                  <>
                    <View style={styles.txtRowContainer}>
                      <Visibility />
                      <Text style={styles.txtFeatures}>
                        {Math.round(weatherData?.visibility / 1000)} km
                      </Text>
                    </View>
                  </>
                ) : (
                  <ActivityIndicator size="large" />
                )}
              </View>
            </View>
          </View>
        </View>
        {/* ------------ WEATHER MAIN SECOND SCREEN ------------ */}
        <View style={styles.forecastMainContainer}>
          <View style={styles.forecastWhiteContainer}>
            {forecast ? (
              forecast.map((entry, index) => {
                const dateForecast = new Date(entry.dt * 1000);
                const hourForecast = dateForecast.getHours();
                const formattedHour =
                  hourForecast > 12
                    ? (hourForecast - 12).toString().padStart(2) + " PM"
                    : hourForecast.toString().padStart(2) + " AM";
                const key = `${entry.dt}-${index}`; // Generate unique key using timestamp and index

                return (
                  <View key={key} style={styles.forecastBrownContainer}>
                    <Text style={styles.txtTimeTemp}>{formattedHour} </Text>
                    <View style={styles.forecastIconContainer}>
                      <Image
                        style={styles.forecastIconImage}
                        source={{
                          uri: `https://openweathermap.org/img/w/${entry.weather[0].icon}.png`,
                        }}
                      />
                      <Text style={styles.txtDesc}>
                        {entry.weather[0].description}
                      </Text>
                    </View>

                    <Text style={styles.txtTimeTemp}>
                      {Math.round(entry.main.temp - 273.15)}°C
                    </Text>
                  </View>
                );
              })
            ) : (
              <ActivityIndicator size="large" />
            )}
          </View>
        </View>
      </Swiper>
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

  weatherTodayText: {
    fontFamily: "LatoBold",
    fontSize: 31,
    color: colors.white,
  },
  temperatureContainer: {
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
  temperatureText: {
    fontFamily: "LatoBold",
    fontSize: 45,
    color: colors.white,
    // 8 is what percent of 360 = 2.22%
    marginRight: screenWidth * 0.022,
  },
  weatherTodayIconImg: {
    //marginTop: 8,
    marginTop: screenHeight * 0.01,
    // height: 64
    height: screenHeight * 0.08,
    // width: 64,
    width: screenWidth * 0.178,
    // borderColor: "violet",
  },
  bannerWave: {
    position: "absolute",
    // 64 is what percent of 728 = 8.79%
    top: screenHeight * 0.0879,
  },
  searchContainer: {
    // 24 is what percent of 728 = 3.3%
    marginTop: screenHeight * 0.033,
    // // height: 40
    height: screenHeight * 0.0549,
    // // width: 312
    width: screenWidth * 0.867,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    borderRadius: 24,
  },
  weatherContainer: {
    // marginTop: 16,
    marginTop: screenHeight * 0.022,
    // height: 208,
    height: screenHeight * 0.286,
    // width: 280,
    width: screenWidth * 0.778,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 24,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  weatherTxtContainer: {
    // marginTop: 8,
    marginTop: screenHeight * 0.011,
    // width: 280,
    width: screenWidth * 0.778,
    justifyContent: "center",
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: "white",
  },
  tempMainContainer: {
    // marginTop: 16,
    marginTop: screenHeight * 0.022,
    // width: 224,
    width: screenWidth * 0.622,
    alignSelf: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: "white",
  },
  tempMinMaxContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: "white",
  },

  // Other Weather Info Screen
  featureMainContainer: {
    //marginTop: 16,
    marginTop: screenHeight * 0.02,
    alignItems: "center",
    flexDirection: "column",
    // borderWidth: 1,
    // borderColor: "red",
  },
  row1Container: {
    // width: 264,
    width: screenWidth * 0.73,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
    // borderColor: "blue",
  },
  row2Container: {
    //marginTop: 16,
    marginTop: screenHeight * 0.02,
    // width: 264,
    width: screenWidth * 0.73,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
    // borderColor: "violet",
  },
  columnContainer: {
    alignItems: "center",
  },
  whiteContainer: {
    alignItems: "center",
    // height: 48,
    height: screenHeight * 0.066,
    // width: 120,
    width: screenWidth * 0.333,
    backgroundColor: colors.white,
    justifyContent: "center",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  redContainer: {
    // height: 32,
    height: screenHeight * 0.044,
    // width: 120,
    width: screenWidth * 0.333,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  // Forecast Screen
  forecastMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  forecastWhiteContainer: {
    // marginTop: 4,
    marginTop: screenHeight * 0.03,
    // height: 176,
    height: screenHeight * 0.22,
    // width: 280,
    width: screenWidth * 0.778,
    backgroundColor: `rgba(255, 255, 255, 0.30)`,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 8,
  },
  forecastBrownContainer: {
    // height: 120
    height: screenHeight * 0.188,
    // width: 80,
    width: screenWidth * 0.222,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  forecastIconContainer: {
    // height: 70
    height: screenHeight * 0.0875,
    // width: 70,
    width: screenWidth * 0.194,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#C69083",
  },
  forecastIconImage: {
    // height: 50
    height: screenHeight * 0.0625,
    // width: 50,
    width: screenWidth * 0.139,
  },

  txtRowContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  imgTemp: {
    height: 64,
    width: 40,
    resizeMode: "contain",
  },
  txtTemp: {
    fontSize: 29,
    fontFamily: "LatoBold",
    color: colors.white,
    paddingRight: 16,
  },
  txtTitle: {
    fontSize: 31,
    fontFamily: "LatoBold",
    color: colors.white,
  },
  txtInputCity: {
    fontSize: 16,
    fontFamily: "LatoRegular",
    color: colors.tertiary,
  },
  city: {
    fontSize: 16,
    fontFamily: "LatoRegular",
    color: colors.tertiary,
  },
  temp: {
    fontSize: 64,
    fontFamily: "LatoBold",
    color: colors.tertiary,
  },
  txtRegular: {
    fontSize: 13,
    fontFamily: "LatoRegular",
    color: colors.tertiary,
  },
  txtFeaturesTitle: {
    fontSize: 16,
    fontFamily: "LatoBold",
    color: colors.tertiary,
  },
  txtFeatures: {
    fontSize: 16,
    fontFamily: "LatoRegular",
    color: colors.tempText,
    paddingLeft: 5,
  },

  // Forecast Screen
  txtTimeTemp: {
    fontSize: 16,
    fontFamily: "LatoBold",
    color: colors.tertiary,
  },
  txtDesc: {
    fontSize: 10,
    fontFamily: "LatoBold",
    color: colors.tertiary,
  },
});
