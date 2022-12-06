import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN = "access_token";

export const getToken = async () => {
  return await AsyncStorage.getItem("access_token");
};

export const signIn = async (newToken) => {
  console.log(newToken, "?????????????");
  return await AsyncStorage.setItem("access_token", newToken);
};

// export const register = async () => {
//   return;
// };

export const signOut = async () => {
  return await AsyncStorage.removeItem(ACCESS_TOKEN);
};
