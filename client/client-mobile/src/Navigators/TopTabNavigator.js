import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyListing from "../screens/MyListing";
import Ongoing from "../screens/Ongoing";
import History from "../screens/History";
import { COLORS } from "../constants";

const TopTab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="My Listing" component={MyListing} />
      <TopTab.Screen name="Ongoing" component={Ongoing} />
      <TopTab.Screen name="History" component={History} />
    </TopTab.Navigator>
  );
}

const styles = StyleSheet.create({});
