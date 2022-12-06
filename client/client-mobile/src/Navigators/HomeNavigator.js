import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import NewHome from "../screens/NewHome";
import PostDetail from "../screens/PostDetail";
import PostItem from "../screens/PostItem";
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={NewHome} />
      <Stack.Screen name="PostDetail" component={PostDetail} options={{ headerShown: true }} />
      <Stack.Screen name="Post" component={PostItem} options={({ route }) => ({ title: route.params.category })} />
      <Stack.Screen name="MyProfile" component={Profile} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
