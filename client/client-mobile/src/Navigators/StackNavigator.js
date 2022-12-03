import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
// import Login from "../screens/Login";
import Register from "../screens/Register";
import OnboardingScreenr from "../screens/OnboardingScreen";
import Login from "../screens/Login";
import TabNavigator from "./TabNavigator";
import PostDetail from "../screens/PostDetail";

const Stack = createNativeStackNavigator();

export default function StackNavigator({ firstLaunch }) {
  return (
    // <Stack.Navigator initialRouteName={firstLaunch ? "Onboarding" : "Login"} screenOptions={{ headerShown: false }}>
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      {/* // <Stack.Navigator initialRouteName="Tab"> */}
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen name="Onboarding" component={OnboardingScreenr} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PostDetail" component={PostDetail} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
