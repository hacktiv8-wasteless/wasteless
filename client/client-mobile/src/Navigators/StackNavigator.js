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
import NewHome from "../screens/NewHome";

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
      // initialRouteName={firstLaunch ? "Onboarding" : "Login"}
      initialRouteName="Register"
      screenOptions={{
        // headerStyle: {
        //   backgroundColor: COLORS.primary,
        // },
        // headerTintColor: COLORS.white,
        headerTitleAlign: "center",
        tabBarHideOnKeyboard: true,
        // headerShadowVisible: false,
      }}
    >
      {/* <Stack.Screen name="NewHome" component={NewHome} options={{ headerShown: false }} /> */}

      <Stack.Screen name="Onboarding" component={OnboardingScreenr} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />

      {/* Post, nanti mungkin pindah file stack baru */}
      <Stack.Screen name="PostDetail" component={PostDetail} options={{ headerShown: true }} />
      <Stack.Screen name="Post" component={PostItem} options={({ route }) => ({ title: route.params.category })} />

      <Stack.Screen name="MyProfile" component={Profile} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
