import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormUser from "../components/FormUser";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register({ navigation }) {
  return (
    <SafeAreaView>
      <Text>form register</Text>
      <FormUser page={"Register"} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
