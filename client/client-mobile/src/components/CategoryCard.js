import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function CategoryCard({ item }) {
  const navigation = useNavigation();

  const handleCategoryNavigate = () => {
    console.log("Ke category apa");
  };

  return (
    <TouchableOpacity onPress={handleCategoryNavigate}>
      <View key={item} style={{ borderWidth: 0.5, borderColor: "gray", marginRight: 20, padding: 10, borderRadius: 40 }}>
        <Text>{item}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
