import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "native-base";

export default function Home({ navigation }) {
  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
  };
  const logout = async () => {
    console.log("before", AsyncStorage.getItem("access_token"));
    await AsyncStorage.removeItem("access_token");
    console.log("after", AsyncStorage.getItem("access_token"));
  };
  const check = async () => {
    console.log(await AsyncStorage.getItem("access_token"));
    console.log(await AsyncStorage.getItem("appLaunched"));
  };

  useEffect(() => {
    // getToken();
    AsyncStorage.getItem("access_token").then((token) => console.log(">>>>>>", token));
    // console.log(token, "<<<<");
  }, []);
  return (
    <View>
      <Text>Home</Text>
      <Button onPress={() => navigation.navigate("PostItem")} style={styles.buttonTest}>
        ke post
      </Button>
      <Button onPress={check} style={styles.buttonTest}>
        Check
      </Button>
      <Button onPress={logout} style={styles.buttonTest}>
        Logout
      </Button>
      <Button onPress={clearAsyncStorage} style={styles.buttonTest}>
        Clear all storage
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonTest: {
    marginVertical: 50,
  },
});
