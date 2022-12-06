import { StyleSheet, View, Image, TouchableHighlight, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, FormControl, Icon, Input, Pressable, Stack, WarningOutlineIcon, Button, Center, Heading, VStack, Link, HStack, Text, TextArea, AspectRatio } from "native-base";
import { COLORS } from "../constants";

const { width, height } = Dimensions.get("screen");

export default function ListingCard() {
  const handleOnPress = () => {
    console.log("berhasil");
  };

  return (
    <View style={{ flexDirection: "column" }}>
      <Pressable onPress={handleOnPress}>
        <Box
          bg={COLORS.white}
          _text={{
            color: COLORS.dark,
            fontWeight: "700",
            fontSize: "md",
          }}
          width="full"
          px="3"
          py="2"
        >
          Title
        </Box>
        <Box style={styles.imageContainer}>
          <Image source={{ uri: "http://placekitten.com/600/400" }} style={styles.image} resizeMode="cover" />
          {/* <Center
            bg={COLORS.accent}
            _text={{
              color: COLORS.dark,
              fontWeight: "500",
              fontSize: "xs",
            }}
            position="absolute"
            // bottom="0"
            top="0"
            right="0"
            px="3"
            py="1.5"
            borderBottomLeftRadius={20}
          >
            Category
          </Center> */}
        </Box>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flexDirection: "column",
  // },
  imageContainer: {
    overflow: "hidden",
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    height: 125,
    // width: "100%",
    // marginVertical: 10,
    // marginTop:,
    // height: "100%",
    // flex: 1,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    height: 150,
    width: width * 0.8,
    // width: "100%",
    resizeMode: "cover",
  },
});
