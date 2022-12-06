import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const SearchBar = ({ search, handleSearchChange, handleOnSubmit }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 1,
        padding: 15,
        borderRadius: 30,
        backgroundColor: COLORS.lightGrey,
        marginVertical: 10,
      }}
    >
      <TextInput
        // onPressOut={() => navigation.navigate("Search")}
        style={{
          paddingHorizontal: 10,
          flex: 1,
        }}
        value={search}
        onChangeText={handleSearchChange}
        placeholder="Search Reuseable Materials"
      />
      <Pressable onPress={handleOnSubmit}>
        <Ionicons name="search" size={24} color={COLORS.primaryShade[500]} style={{ marginRight: 10 }} />
      </Pressable>
    </View>
  );
};

// styles
const styles = StyleSheet.create({});

export default SearchBar;
