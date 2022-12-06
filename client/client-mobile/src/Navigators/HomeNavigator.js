import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import NewHome from "../screens/NewHome";
import PostDetail from "../screens/PostDetail";
import PostItem from "../screens/PostItem";
import Profile from "../screens/Profile";
import MapDirection from "../screens/MapDirection";
import Maps from "../screens/Maps";
import Chat from "../screens/Chat";
import XenditPayment from "../screens/XenditScreen";
import HistoryLogs from "../screens/HistoryLogs";
import ScannerQR from "../screens/Scanner";
import Payment from "../screens/PaymentScreen";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={NewHome} />
      <Stack.Screen name="PostDetail" component={PostDetail} options={{ headerShown: true }} />
      <Stack.Screen name="Post" component={PostItem} options={({ route }) => ({ title: route.params.category })} />
      <Stack.Screen name="MyProfile" component={Profile} />
      <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
      <Stack.Screen name="MapDirection" component={MapDirection} options={{ headerShown: true }} />
      <Stack.Screen name="Maps" component={Maps} options={{ headerShown: true }} />

      <Stack.Screen name="ScanQR" component={ScannerQR} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Xendit" component={XenditPayment} />
      <Stack.Screen name="HistoryLogs" component={HistoryLogs} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
