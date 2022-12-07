import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
<<<<<<< HEAD

export default function CategoryCard({ item }) {
  const navigation = useNavigation();

  const handleCategoryNavigate = () => {
    console.log("Ke category apa");
=======
import { COLORS } from "../constants";

export default function CategoryCard({ item, categoryId }) {
  const navigation = useNavigation();

  const handleCategoryNavigate = () => {
    // console.log(categoryId);
    navigation.navigate("SearchByCategory", { categoryId, name: item.name });
>>>>>>> development
  };

  return (
    <TouchableOpacity onPress={handleCategoryNavigate}>
<<<<<<< HEAD
      <View style={{ borderWidth: 0.5, borderColor: "gray", marginRight: 20, padding: 10, borderRadius: 40 }}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
=======
      <View
        style={{
          backgroundColor: COLORS.lightGrey,
          marginLeft: 20,
          padding: 10,
          borderRadius: 15,
          height: 40,
          marginBottom: 10,
          paddingHorizontal: 15,
          shadowColor: COLORS.primaryShade[500],
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}
      >
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
    // <Text>{item.name}</Text>
>>>>>>> development
  );
}

const styles = StyleSheet.create({});
