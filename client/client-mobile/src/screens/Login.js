import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormUser from "../components/FormUser";

export default function Login() {
  return (
    <View>
      <FormUser page={"Login"} />
    </View>
  );
}

const styles = StyleSheet.create({});
