import { StyleSheet, View, Text, Button } from "react-native";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

const LocalNotification = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
        shouldSetBadge: true,
      };
    },
  });

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== "granted") {
          return;
        }
      });
  }, []);

  const handleNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "YosBrix",
        body: "Molding is finished!",
      },
      trigger: {
        seconds: 1,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text>Local Notification</Text>
      <StatusBar style="auto" />
      <Button title="Send Notification" onPress={handleNotification}/>
    </View>
  );
};

export default LocalNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

