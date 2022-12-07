import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const ACCESS_TOKEN = "access_token";

// const [access_token, setAccess_token] = useState("");
// const [userId, setUserId] = useState(null);

export const getToken = async (token) => {
  try {
    return await AsyncStorage.getItem(token);
  } catch (error) {
    console.log(error);
  }
};

export const getUserId = async () => {
  try {
    return await AsyncStorage.getItem("userId");
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (newToken, userId) => {
  try {
    console.log(newToken, "?????????????");
    console.log(userId, "!!!!!!!");
    await AsyncStorage.setItem("access_token", newToken);
    await AsyncStorage.setItem("userId", userId.toString());
  } catch (error) {
    console.log(error);
  }
};

// export const register = async () => {
//   return;
// };

export const signOut = async () => {
  try {
    await AsyncStorage.clear();
    return await AsyncStorage.removeItem("access_token");
  } catch (error) {
    console.log(error);
  }
};

export const capitalize = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return "";
};
