import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
// import Login from "../screens/Login";
import Home from "../screens/Home";
import Register from "../screens/Register";
import OnboardingScreenr from "../screens/OnboardingScreen";
import Login from "../screens/Login";
import TabNavigator from "./TabNavigator";
import Categories from "../screens/SearchByCategory";

const Stack = createNativeStackNavigator();

export default function StackNavigator({ firstLaunch }) {
  return (
    // <Stack.Navigator initialRouteName={firstLaunch ? "Onboarding" : "Login"} screenOptions={{ headerShown: false }}>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      {/* // <Stack.Navigator initialRouteName="Tab"> */}
      <Stack.Screen name="Onboarding" component={OnboardingScreenr} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="HomeScreen" component={Home} />
      {/* Fadil */}
      {/* commented dr sana */}
      {/* <Stack.Screen name="Login" component={Login} /> */}
      {/* <Stack.Screen name="CategoryScreen" component={CategoryScreen} /> */}

      {/* ga dikomen dr sana */}
      {/* 
      <Stack.Screen name="PostItem" component={PostItem} />
      <Stack.Screen name="Chat" component={Chat} />
       */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
