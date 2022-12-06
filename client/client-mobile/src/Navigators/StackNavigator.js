import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import Register from "../screens/Register";
import OnboardingScreenr from "../screens/OnboardingScreen";
import Login from "../screens/Login";
import TabNavigator from "./TabNavigator";
import MapDirection from "../screens/MapDirection";
import Maps from "../screens/Maps";

const Stack = createNativeStackNavigator();

export default function StackNavigator({ firstLaunch }) {
  return (
    <Stack.Navigator
      initialRouteName={firstLaunch ? "Onboarding" : "Login"}
      // initialRouteName="Login"
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
      {/* <Stack.Screen name="Onboarding" component={OnboardingScreenr} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}

      <Stack.Screen name="Onboarding" component={OnboardingScreenr} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />

      {/* <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MapDirection"
        component={MapDirection}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Maps"
        component={Maps}
        options={{ headerShown: true }}
      /> */}

      {/* Post, nanti mungkin pindah file stack baru */}
      {/* <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Post"
        component={PostItem}
        options={({ route }) => ({ title: route.params.category })}
      /> */}

      {/* <Stack.Screen name="MyProfile" component={Profile} /> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
