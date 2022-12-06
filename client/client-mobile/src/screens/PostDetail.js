import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ScrollView } from "native-base";
import mapPlaceHolder from "../../assets/placeHolder/mapPlaceHolder.png";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import { GET_POST_DETAIL } from "../query/Posts";

const MAP_PLACEHOLDER = Image.resolveAssetSource(mapPlaceHolder).uri;

export default function PostDetail({ navigation, route }) {
  // const { id } = route.params;

  // useEffect(() => console.log(id), []);

  const { data: postDetailData, loading: postDetailLoading, error: postDetailError } = useQuery(GET_POST_DETAIL);

  if (postDetailLoading) return <Text>Loadinggg.....</Text>;
  if (postDetailError) {
    console.log("postDetailError ---------------------");
    console.log(postDetailError);
    console.log("postDetailError ---------------------");

    return <Text>Error: {postDetailError}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.imageContainer}>
        <Image source={{ uri: "http://placekitten.com/150/150" }} style={styles.image} />
      </View> */}
      <View style={styles.imageContainer2}>
        <Image source={{ uri: "http://placekitten.com/700/800" }} style={styles.image} />
      </View>
      <View style={styles.postDetail}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.title}>Plastic bottles</Text>
          <Button onPress={() => console.log("jalan delete")} variant="unstyled">
            <Feather name="trash-2" size={24} color="red" />
          </Button>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.category}>Category</Text>
        </View>
        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed est ex, elementum nec placerat at, sagittis vel lorem. Sed posuere ante eu leo euismod, et semper felis fermentum. Fusce malesuada id ipsum ac consequat. Mauris vel consectetur dui. Aenean commodo et diam id auctor. Sed orci est, sagittis et libero quis, varius interdum leo. </Text>
        {/* <Text style={styles.subTitle}>Photos</Text> */}
        <Text style={styles.subTitle}>Location</Text>
        <View style={styles.mapContainer}>
          <Image source={{ uri: MAP_PLACEHOLDER }} style={styles.image} />
        </View>
      </View>
      {/* <View style={{ alignItems: "center" }}>
        <Button style={styles.button}>Set Appointment</Button>
      </View> */}
      <Button height={100}>Set Appointment</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    overflow: "hidden",
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    // marginTop:,
    // height: "100%",
    flex: 1,
  },
  imageContainer2: {
    overflow: "hidden",
    backgroundColor: "yellow",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  postDetail: {
    flex: 2,
    padding: 20,
    // backgroundColor: "tomato",
    backgroundColor: "white",
    borderTopColor: "gray",
  },
  // imageContainer: {
  //   overflow: "hidden",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   // height: 100,
  //   // width: 100,
  //   borderRadius: 15,
  // },
  image: { height: "100%", width: "100%", resizeMode: "cover" },
  category: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#444444",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    lineHeight: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
  },
  button: {
    height: 50,
    borderRadius: 50,
    width: 200,
  },
});
