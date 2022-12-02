import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Home from "../screens/Home";
import Search from "../screens/Search";
import PostItem from "../screens/PostItem";
import Chat from "../screens/Chat";
// import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      {/* <Stack.Screen name="Login" component={Login} /> */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PostItem" component={PostItem} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
