import { StyleSheet, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, FormControl, Icon, Input, Pressable, Stack, WarningOutlineIcon, Button, Center, Heading, VStack, Link, HStack, Text, TextArea } from "native-base";

export default function ListingCard() {
  return (
    <Stack style={styles.imageContainer}>
      <Image source={{ uri: "http/placekitten.com/600/400" }} style={styles.image} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    overflow: "hidden",
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    height: 150,
    width: "85%",
    marginVertical: 10,
    // marginTop:,
    // height: "100%",
    // flex: 1,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
