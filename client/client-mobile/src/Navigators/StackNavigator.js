import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import OnboardingScreenr from "../screens/OnboardingScreen";
import PostItem from "../screens/PostItem";

const Stack = createNativeStackNavigator();

export default function StackNavigator({ firstLaunch }) {
  return (
    <Stack.Navigator initialRouteName={firstLaunch ? "Onboarding" : "Login"}>
      <Stack.Screen name="Onboarding" component={OnboardingScreenr} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
