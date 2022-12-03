import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ListingCard from "../components/ListingCard";
import { FlatList, ScrollView } from "native-base";
import QR from "../components/QR";

export default function MyListing() {
  const dummy = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];

  const [data, setData] = useState(dummy);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* <ScrollView> */}
        <View style={{ paddingLeft: 20, paddingTop: 10 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <ListingCard />
                  <QR />
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // flex: 1,
    // alignItems: "center",
  },
});
