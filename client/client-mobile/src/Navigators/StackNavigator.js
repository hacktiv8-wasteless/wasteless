import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Home from "../screens/Home";
import PostItem from "../screens/PostItem";
import Chat from "../screens/Chat";
import CategoryScreen from "../screens/SearchAllCategory";
import Categories from "../screens/SearchByCategory";
// import Login from "../screens/Login";
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

      {/* Fadil */}
      {/* commented dr sana */}
      {/* <Stack.Screen name="Login" component={Login} /> */}
      {/* <Stack.Screen name="CategoryScreen" component={CategoryScreen} /> */}
      
      {/* ga dikomen dr sana */}
      {/* <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="PostItem" component={PostItem} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Categories" component={Categories} /> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
