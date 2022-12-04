import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FlatList } from "native-base";
import ListingCard from "../components/ListingCard";
import QR from "../components/QR";
import UserAvatar from "../components/UserAvatar";

export default function OngoingOrder() {
  const dummy = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];

  const [data, setData] = useState(dummy);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.viewContainer}>
              <UserAvatar />
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
