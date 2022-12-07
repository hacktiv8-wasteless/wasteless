import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const ACCESS_TOKEN = "access_token";

// const [access_token, setAccess_token] = useState("");
// const [userId, setUserId] = useState(null);

export const getToken = async (token) => {
  return await AsyncStorage.getItem(token);
};

export const getUserId = async () => {
  return await AsyncStorage.getItem("userId");
};
export const getUsername = async () => {
  return await AsyncStorage.getItem("username");
};

export const signIn = async (newToken, userId, username) => {
  console.log(newToken, "?????????????");
  await AsyncStorage.setItem("access_token", newToken);
  await AsyncStorage.setItem("userId", userId.toString());
  await AsyncStorage.setItem("username", username);
};

// export const register = async () => {
//   return;
// };

export const signOut = async () => {
  await AsyncStorage.removeItem(ACCESS_TOKEN);
};

export const capitalize = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return "";
};
