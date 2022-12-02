import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  useEffect(() => {
    // getToken();
    AsyncStorage.getItem("access_token").then((token) => console.log(">>>>>>", token));
    // console.log(token, "<<<<");
  }, []);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
