import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export const useLocalNotification = () => {
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

  const showNotification = (body) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "YosBrix",
        body: body,
      },
      trigger: {
        seconds: 1,
      },
    });
  };

  return { showNotification };
};
