import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const SLIDER_HEIGHT = Dimensions.get("window").height;
export const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT);
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const CarouselCardItem = ({ item, index }) => {
  return (
    <View className="bg-blue-400" key={index} style={styles.container}>
      <Image source={{ uri: item.imgUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: 1000,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: 360,
    height: 170,
  },
});

export default CarouselCardItem;
