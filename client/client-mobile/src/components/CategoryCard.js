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
  VStack,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "native-base";

const AllCategory = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View>
        <TouchableOpacity
        // onPress={() => navigation.navigate("Detail", { id: menu.id })}
        >
          <Box px="4" pt="4">
            <HStack justifyContent="center" space="5" marginTop="3">
              <Avatar
                bg="green.500"
                size="xl"
                source={{
                  uri: "https://img.freepik.com/premium-vector/garbage-bin-with-metal-waste-recycling-garbage-vector-illustration_263366-48.jpg?w=2000",
                }}
              ></Avatar>

              <Avatar
                bg="gren.500"
                size="xl"
                source={{
                  uri: "https://img.freepik.com/premium-vector/garbage-bin-with-metal-waste-recycling-garbage-vector-illustration_263366-48.jpg?w=2000",
                }}
              >
                TE
              </Avatar>

              <Avatar
                bg="green.500"
                size="xl"
                source={{
                  uri: "https://img.freepik.com/premium-vector/garbage-bin-with-metal-waste-recycling-garbage-vector-illustration_263366-48.jpg?w=2000",
                }}
              >
                JB
              </Avatar>
            </HStack>
          </Box>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AllCategory;
