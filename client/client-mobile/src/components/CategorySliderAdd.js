import { StyleSheet, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { Actionsheet, Box, Button, Center, useDisclose, Text } from "native-base";

export default function CategorySliderAdd({ navigation }) {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Center>
      <Button onPress={onOpen}>Actionsheet</Button>

      {/* Bottom Sheet */}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: "gray.300",
              }}
            >
              Pick a Category
            </Text>
          </Box>
          {/* Ini ntar flatlist dari category, sekarang HARDCODE DULU */}
          <Actionsheet.Item
            onPress={() => {
              navigation.navigate("PostItem");
            }}
          >
            Plastic Packaging
          </Actionsheet.Item>
          <Actionsheet.Item>Carton Packaging</Actionsheet.Item>
          <Actionsheet.Item>Glass Packaging</Actionsheet.Item>
          <Actionsheet.Item>Aluminum Cans</Actionsheet.Item>
          <Actionsheet.Item>Paper/Cardboard</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}

const styles = StyleSheet.create({});
