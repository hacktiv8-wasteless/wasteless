import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormUser from "../components/FormUser";

export default function Register({ navigation }) {
  return (
    <View>
      <FormUser page={"Register"} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({});
