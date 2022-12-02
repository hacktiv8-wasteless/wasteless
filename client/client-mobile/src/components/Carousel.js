import { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";

const { width } = Dimensions.get("window");
const height = width * 0.6;

const images = [
  "https://www.heritage-enviro.com/wp-content/uploads/2022/04/Recycling-Graphic.png",
  "https://api.watsons.co.id/api/v2/wtcid/blog/wp-content/uploads/0533-Main-Banner-3.png",
  "https://static.vecteezy.com/system/resources/previews/004/927/478/non_2x/recycle-process-with-trash-organic-paper-or-plastic-to-protect-the-ecology-environment-suitable-for-banner-background-and-web-in-flat-illustration-vector.jpg",
];

export default function Carousel() {
  const [img, setImg] = useState({
    active: 0,
  });

  function changeSlide({ nativeEvent }) {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== img.active) {
      setImg({ active: slide });
    }
  }

  return (
    <>
      <View style={style.container}>
        <ScrollView
          pagingEnabled
          horizontal
          onScroll={changeSlide}
          showsHorizontalScrollIndicator={false}
          style={style.scroll}
        >
          {images.map((image, index) => {
            return (
              <Image key={index} source={{ uri: image }} style={style.image} />
            );
          })}
        </ScrollView>
        <View style={style.pagination}>
          {images.map((i, k) => {
            return (
              <Text
                key={k}
                style={k === img.active ? style.activePagination : style.text}
              >
                ⬤
              </Text>
            );
          })}
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: { width, height },
  scroll: { width, height },
  image: { width, height, resizeMode: "cover" },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  text: { fontSize: width / 30, color: "white", margin: 3 },
  activePagination: { fontSize: width / 30, color: "red", margin: 3 },
});
