import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";

export default function CategoryCard({ item, categoryId }) {
  const navigation = useNavigation();

  const handleCategoryNavigate = () => {
    // console.log(categoryId);
    navigation.navigate("SearchByCategory", { categoryId, name: item.name });
  };

  return (
    <TouchableOpacity onPress={handleCategoryNavigate}>
      <View style={{ borderWidth: 1, borderColor: COLORS.primaryShade["500"], marginRight: 20, padding: 10, borderRadius: 40, height: 40, marginBottom: 20 }}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
    // <Text>{item.name}</Text>
  );
}

const styles = StyleSheet.create({});
