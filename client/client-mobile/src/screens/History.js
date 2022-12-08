import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FlatList } from "native-base";
import ListingCard from "../components/ListingCard";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../query/Posts";
import { useEffect } from "react";
import { getUserId } from "../helpers/util";
import Loader from "../components/Loader";

const { height, width } = Dimensions.get("screen");

export default function History() {
  const [userId, setUserId] = useState(null);
  const [completedPosts, setCompletedPosts] = useState([]);
  console.log(userId);
  
  useEffect(() => {
    let newFilter = postsData?.getAllPosts.filter((el) => el.taker_id == userId && el.status == "complete");
    setCompletedPosts(newFilter);
  }, [postsData, userId]);

  console.log(completedPosts);

  const userIdGetter = async () => {
    const data = await getUserId();
    setUserId(Number(data));
  };

  const { data: postsData, loading: postsLoading, error: postsError } = useQuery(GET_POSTS);

  if (postsError) {
    console.log("postsError -------------------------");
    console.log(postsError);
    console.log("postsError -------------------------");
  }

  // const myListingPosts = postsData?.getAllPosts?.filter((myListing) => {
  //   return (myListing?.status === "complete" && myListing?.giver_id == userId) || (myListing?.status === "complete" && myListing?.taker_id === userId);
  // });

  useEffect(() => {
    userIdGetter();
  }, []);

  if (postsLoading) return <Loader />;

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {completedPosts?.length === 0 ? (
            <View style={{ justifyContent: "center", alignItems: "center", height: height - 200 }}>
              <Text style={{ fontWeight: "400", fontSize: 16, color: "gray" }}>No posts.</Text>
            </View>
          ) : (
            completedPosts?.map((post) => {
              return (
                <View key={post["_id"]} style={styles.viewContainer}>
                  <ListingCard post={post} />
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
