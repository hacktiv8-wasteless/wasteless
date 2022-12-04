import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
// import Login from "../screens/Login";
import Home from "../screens/Home";
import Register from "../screens/Register";
import OnboardingScreenr from "../screens/OnboardingScreen";
import Login from "../screens/Login";
import TabNavigator from "./TabNavigator";
import Categories from "../screens/SearchByCategory";

import PostDetail from "../screens/PostDetail";
import { COLORS } from "../constants";
import PostItem from "../screens/PostItem";
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();

export default function StackNavigator({ firstLaunch }) {
  return (
    // <Stack.Navigator
    //   initialRouteName={firstLaunch ? "Onboarding" : "Login"}
    //   screenOptions={{
    //     headerStyle: {
    //       backgroundColor: COLORS.primary,
    //     },
    //     headerTintColor: COLORS.white,
    //     headerTitleAlign: "center",
    //     headerShadowVisible: false,
    //   }}
    // >
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{
        // headerStyle: {
        //   backgroundColor: COLORS.primary,
        // },
        // headerTintColor: COLORS.white,
        headerTitleAlign: "center",
        // headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreenr} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />

      {/* Post, nanti mungkin pindah file stack baru */}
      <Stack.Screen name="PostDetail" component={PostDetail} options={{ headerShown: true }} />
      <Stack.Screen name="Post" component={PostItem} options={({ route }) => ({ title: route.params.category })} />

      <Stack.Screen name="MyProfile" component={Profile} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
