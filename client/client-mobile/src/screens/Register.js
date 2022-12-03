import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import FormUser from "../components/FormUser";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";
import { Pressable } from "native-base";

export default function Register({ navigation }) {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* Status Bar */}
        <StatusBar barStyle="light-content" backgroundColor="#339966" />

        <View>
          <Text style={styles.title}>Hi, we are Wasteless</Text>
          <Text style={styles.welcomeText}>We are here to help you build a recycling habit!</Text>
        </View>

        <FormUser page={"Register"} navigation={navigation} />

        <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
          <Text style={styles.signup}>Already signed up? Sign in </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.button}>here.</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    color: "white",
    marginTop: 15,
    fontSize: 18,
  },
  welcomeText2: {
    color: "white",
    marginTop: 5,
    fontSize: 18,
  },
  title: {
    fontSize: 54,
    fontWeight: "bold",
    color: "white",
  },
  signup: {
    color: "white",
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    color: "white",
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "bold",
  },
});
