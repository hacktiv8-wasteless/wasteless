import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
// import Login from "../screens/Login";
import Register from "../screens/Register";
import OnboardingScreenr from "../screens/OnboardingScreen";
import Login from "../screens/Login";
import TabNavigator from "./TabNavigator";
import PostDetail from "../screens/PostDetail";
import { COLORS } from "../constants";

const Stack = createNativeStackNavigator();

export default function StackNavigator({ firstLaunch }) {
  return (
    // <Stack.Navigator initialRouteName={firstLaunch ? "Onboarding" : "Login"} screenOptions={{ headerShown: false }}>
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleAlign: "center",
        headerShadowVisible: false,
      }}
    >
      {/* // <Stack.Navigator initialRouteName="Tab"> */}
      <Stack.Screen name="Onboarding" component={OnboardingScreenr} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="PostDetail" component={PostDetail} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
