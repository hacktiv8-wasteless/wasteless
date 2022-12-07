import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ItemCardSmall({ post }) {
  const navigation = useNavigation();
  // console.log(post["_id"]);
  return (
    <View style={{ marginVertical: 2.5, marginHorizontal: 15 }}>
      <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { id: post["_id"] })}>
        <View style={{ width: 150, height: 150, overflow: "hidden", borderRadius: 20 }}>
          <Image source={{ uri: post.mainImage }} style={{ width: 150, height: 150 }} />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>{post.title.charAt(0).toUpperCase() + post.title.slice(1)}</Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="location" size={24} color="gray" />
            {/* <Text>Lat: {post.lat} </Text>
            <Text>Long: {post.long}</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
