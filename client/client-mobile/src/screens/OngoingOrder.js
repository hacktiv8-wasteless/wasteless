import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FlatList, VStack } from "native-base";
import ListingCard from "../components/ListingCard";
import QR from "../components/QR";
import UserAvatar from "../components/UserAvatar";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../query/Posts";
import { useEffect } from "react";
import { getUserId } from "../helpers/util";

export default function OngoingOrder() {
  const [userId, setUserId] = useState(null);

  const userIdGetter = async () => {
    const data = await getUserId();
    setUserId(Number(data));
  };

  const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_POSTS);

  if (postsLoading) return <Loader />;
  if (postsError) {
    console.log("postsError -------------------------");
    console.log(postsError);
    console.log("postsError -------------------------");
  }

  const myListingPosts = postsData?.getAllPosts?.filter((myListing) => {
    return myListing?.status === "ongoing" && myListing?.giver_id == userId;
  });

  useEffect(() => {
    userIdGetter();
  }, []);

  return (
    <View style={styles.container}>
      {myListingPosts?.map((post) => {
        return (
          <View style={styles.viewContainer}>
            <ListingCard post={post} />
            <QR />
          </View>
        );
      })}
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
