import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListingCard from "../components/ListingCard";
import { FlatList, HStack, ScrollView, Stack, VStack } from "native-base";
import QR from "../components/QR";

export default function MyListing() {
  const dummy = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];

  const [data, setData] = useState(dummy);

  // const { data: userDetailData, loading: userDetailLoading, error: userDetailError } = useQuery(GET_USER_DETAIL);
  // if (userDetailData) return <Text>Loading....</Text>;
  // if (userDetailError) {
  //   console.log("postsError -------------------------");
  //   console.log(userDetailError);
  //   console.log("postsError -------------------------");

  //   return <Text>Error: {userDetailError}</Text>;
  // }

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
