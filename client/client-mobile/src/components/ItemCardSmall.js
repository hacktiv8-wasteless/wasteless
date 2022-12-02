import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  Badge,
  ScrollView,
  View,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { currencyFormat } from "simple-currency-format";

const CardMenu = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View>
        <TouchableOpacity
        // onPress={() => navigation.navigate("Detail", { id: menu.id })}
        >
          <Box alignItems="center">
            <Box
              marginTop="3"
              maxW="80"
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700",
              }}
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: "gray.50",
              }}
            >
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: "https://www.shutterstock.com/image-photo/empty-metal-cans-waiting-on-260nw-175414070.jpg",
                    }}
                    alt="image"
                  />
                </AspectRatio>
                <Center
                  bg="green.500"
                  _dark={{
                    bg: "violet.400",
                  }}
                  _text={{
                    color: "warmGray.50",
                    fontWeight: "700",
                    fontSize: "xs",
                  }}
                  position="absolute"
                  bottom="0"
                  px="3"
                  py="1.5"
                >
                  Categories
                </Center>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    Item Name
                  </Heading>
                  <Text
                    fontSize="xs"
                    _light={{
                      color: "violet.500",
                    }}
                    _dark={{
                      color: "violet.400",
                    }}
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1"
                  >
                    Near by Location
                  </Text>
                </Stack>
                <Text fontWeight="400">Description here!</Text>
                <HStack
                  alignItems="center"
                  space={4}
                  justifyContent="space-between"
                >
                  <HStack alignItems="center">
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      fontWeight="400"
                    >
                      6 mins ago
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
          </Box>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CardMenu;
