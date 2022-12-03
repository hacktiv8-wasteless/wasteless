import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Home from "../screens/Home";
import PostItem from "../screens/PostItem";
import Chat from "../screens/Chat";
import CategoryScreen from "../screens/SearchAllCategory";
import Categories from "../screens/SearchByCategory";
// import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      {/* <Stack.Screen name="Login" component={Login} /> */}
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="PostItem" component={PostItem} />
      <Stack.Screen name="Chat" component={Chat} />
      {/* <Stack.Screen name="CategoryScreen" component={CategoryScreen} /> */}
      <Stack.Screen name="Categories" component={Categories} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
