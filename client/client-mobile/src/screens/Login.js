import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormUser from "../components/FormUser";
import { Button } from "native-base";

export default function Login({ navigation }) {
  return (
    <View>
      <Text>form login</Text>
      <FormUser page={"Login"} navigation={navigation} />
      <Button onPress={() => navigation.navigate("Home")}>ke home</Button>
    </View>
  );
}

const styles = StyleSheet.create({});
