import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormUser from "../components/FormUser";
import { Button } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login({ navigation }) {
  return (
    <SafeAreaView>
      <Text>form login</Text>
      <FormUser page={"Login"} navigation={navigation} />
      <Button onPress={() => navigation.navigate("Tab")}>ke home</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
