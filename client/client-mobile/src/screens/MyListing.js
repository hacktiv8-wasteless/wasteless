import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListingCard from "../components/ListingCard";
import { FlatList, HStack, ScrollView, Stack, VStack } from "native-base";
import QR from "../components/QR";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../query/Posts";
import { GET_CATEGORIES, GET_CATEGORY_ID } from "../query/Categories";
import { getUserId } from "../helpers/util";

export default function MyListing() {
  const dummy = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];

  const [data, setData] = useState(dummy);

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

  // console.log(postsData.getAllPosts);

  const myListingPosts = postsData?.getAllPosts?.filter((myListing) => {
    return myListing?.status === "pending" && myListing?.giver_id === userId;
  });
  // console.log(userId);
  // console.log(myListingPosts);

  // const { data: userDetailData, loading: userDetailLoading, error: userDetailError } = useQuery(GET_USER_DETAIL);
  // if (userDetailData) return <Text>Loading....</Text>;
  // if (userDetailError) {
  //   console.log("postsError -------------------------");
  //   console.log(userDetailError);
  //   console.log("postsError -------------------------");

  //   return <Text>Error: {userDetailError}</Text>;
  // }

  useEffect(() => {
    userIdGetter();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.viewContainer}>
              <ListingCard />
              <QR />
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
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
