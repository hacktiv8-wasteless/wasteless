import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "native-base";
import { Box, FlatList, Text, View } from "native-base";
import Carousel from "../components/Carousel";
import CardMenu from "../components/ItemCardSmall";
import SearchBar from "../components/SearchBar";
import CategoryList from "../components/CategoryHome";

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
      <SearchBar />
      <Carousel />
      {/* <Text>INI HOME!</Text> */}
      <CategoryList />

      <CardMenu />
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
  );;
}
