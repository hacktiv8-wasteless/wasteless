import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  const dummy = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];

  const [data, setData] = useState(dummy);

  const ambilData = () => {
    console.log("ambil data");
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 3000);
  };

  const [refresh, setRefresh] = useState(false);

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        onRefresh={() => ambilData()}
        refreshing={refresh}
        renderItem={({ item }) => (
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 10,
              backgroundColor: "white",
              elevation: 2,
              paddingVertical: 2,
              paddingLeft: 10,
              borderRadius: 3,
            }}
          >
            <Text>{item.id}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
