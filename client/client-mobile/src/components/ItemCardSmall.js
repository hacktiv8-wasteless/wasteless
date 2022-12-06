import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ItemCardSmall({ post }) {
  const navigation = useNavigation();
  return (
    <View key={post.id} style={{ marginVertical: 2.5, marginHorizontal: 15 }}>
      <TouchableOpacity onPress={() => navigation.navigate("PostDetail")}>
        <View style={{ width: 150, height: 150, overflow: "hidden", borderRadius: 20 }}>
          <Image source={{ uri: "http://placekitten.com/200/200" }} style={{ width: 150, height: 150 }} />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>Post Title</Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="location" size={24} color="gray" />
            <Text>6.5 km</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
