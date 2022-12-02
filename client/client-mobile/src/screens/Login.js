import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormUser from "../components/FormUser";

export default function Login({ navigation }) {
  return (
    <View>
      <Text>form login</Text>
      <FormUser page={"Login"} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({});
