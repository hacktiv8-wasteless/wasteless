import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { Button, FormControl, Modal, Input, ScrollView, Center, VStack, Slide, Box } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import CategorySliderAdd from "../components/CategorySliderAdd";

const { width, height } = Dimensions.get("screen");

export default function PostCategory({}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Category apa aja</Text>
      <CategorySliderAdd />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
