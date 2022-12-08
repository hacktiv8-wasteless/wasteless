import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box, Button } from "native-base";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";

export default function UserAvatar() {
  const navigation = useNavigation();

  const handleChatRoute = (id) => {
    // console.log(id);
    navigation.navigate(
      "Chat"
      // { id: post["_id"] }
    );
  };
  return (
    <Box style={styles.qrContainer}>
      <Button style={styles.button} onPress={handleChatRoute}>
        <Feather name="user" size={24} color="black" />
      </Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  qrContainer: {
    marginLeft: 10,
    marginTop: 30,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    backgroundColor: COLORS.white,
    // borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
