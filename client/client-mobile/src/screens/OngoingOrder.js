import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FlatList, VStack } from "native-base";
import ListingCard from "../components/ListingCard";
import QR from "../components/QR";
import UserAvatar from "../components/UserAvatar";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../query/Posts";
import { useEffect } from "react";
import { getUserId } from "../helpers/util";
import Loader from "../components/Loader";
import { COLORS } from "../constants";

const { height, width } = Dimensions.get("screen");

export default function OngoingOrder() {
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
    return myListing?.status === "ongoing" && (myListing?.giver_id == userId || myListing?.taker_id == userId);
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
                  <VStack>
                    <UserAvatar />
                    <QR />
                  </VStack>
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
