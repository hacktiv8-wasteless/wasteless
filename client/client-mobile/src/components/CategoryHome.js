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
import { Avatar } from "native-base";

const CategoryList = () => {
  return (
    <ScrollView>
      <View>
        <HStack justifyContent="center" space={2} marginTop="3">
          <Avatar
            bg="green.500"
            size="lg"
            source={{
              uri: "https://w7.pngwing.com/pngs/722/969/png-transparent-soft-drink-water-bottle-mineral-water-mineral-water-cartoon-water-glass-water-drops.png",
            }}
          >
            AJ
          </Avatar>
          <Avatar
            bg="cyan.500"
            size="lg"
            source={{
              uri: "https://w7.pngwing.com/pngs/722/969/png-transparent-soft-drink-water-bottle-mineral-water-mineral-water-cartoon-water-glass-water-drops.png",
            }}
          >
            TE
          </Avatar>
          <Avatar
            bg="indigo.500"
            size="lg"
            source={{
              uri: "https://w7.pngwing.com/pngs/722/969/png-transparent-soft-drink-water-bottle-mineral-water-mineral-water-cartoon-water-glass-water-drops.png",
            }}
          >
            JB
          </Avatar>
          <Avatar
            bg="amber.500"
            size="lg"
            source={{
              uri: "https://w7.pngwing.com/pngs/722/969/png-transparent-soft-drink-water-bottle-mineral-water-mineral-water-cartoon-water-glass-water-drops.png",
            }}
          >
            TS
          </Avatar>
          <Avatar
            bg="amber.500"
            size="lg"
            source={{
              uri: "https://w7.pngwing.com/pngs/722/969/png-transparent-soft-drink-water-bottle-mineral-water-mineral-water-cartoon-water-glass-water-drops.png",
            }}
          >
            TS
          </Avatar>
        </HStack>
      </View>
    </ScrollView>
  );
};

export default CategoryList;
