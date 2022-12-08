import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListingCard from "../components/ListingCard";
import { FlatList, HStack, ScrollView, Stack, VStack } from "native-base";
import QR from "../components/QR";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../query/Posts";
import { GET_CATEGORIES, GET_CATEGORY_ID } from "../query/Categories";
import { getUserId } from "../helpers/util";
import Loader from "../components/Loader";

const { height, width } = Dimensions.get("screen");

export default function MyListing() {
  const [userId, setUserId] = useState(null);

  const userIdGetter = async () => {
    const data = await getUserId();
    setUserId(Number(data));
  };

  const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_POSTS);

  if (postsError) {
    console.log("postsError -------------------------");
    console.log(postsError);
    console.log("postsError -------------------------");
  }

  const myListingPosts = postsData?.getAllPosts?.filter((myListing) => {
    return myListing?.status === "pending" && myListing?.giver_id == userId;
  });

  useEffect(() => {
    userIdGetter();
  }, []);

  if (postsLoading) return <Loader />;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {myListingPosts?.length === 0 ? (
            <View style={{ justifyContent: "center", alignItems: "center", height: height - 200 }}>
              <Text style={{ fontWeight: "400", fontSize: 16, color: "gray" }}>No posts.</Text>
            </View>
          ) : (
            myListingPosts?.map((post) => {
              return (
                <View key={post["_id"]} style={styles.viewContainer}>
                  <ListingCard post={post} />
                  {/* <QR /> */}
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  viewContainer: { paddingHorizontal: 40, justifyContent: "center", flexDirection: "row", alignItems: "center" },
});
