import React, { useState, useCallback, useEffect } from "react";
import { Image } from "react-native";
import {
  InputToolbar,
  Actions,
  Composer,
  Send,
} from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/native";
import { db } from "../configs/firebase";
import * as Location from "expo-location";

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: "#222B45",
      paddingTop: 6,
    }}
    primaryStyle={{ alignItems: "center" }}
  />
);

export const renderActions = (props) => {
  const navigation = useNavigation();
  const _id = "loc-" + Math.floor(Math.random() * 1000);
  const user = {
    _id: "taker",
    name: "tes",
    avatar:
      "https://i.pinimg.com/originals/dc/71/5b/dc715b37f20c4e478d5bec142c2aca6a.jpg",
  };
  const user1 = "giver";
  const user2 = "taker";
  let roomId = user1 < user2 ? user1 + user2 : user2 + user1;

  const broadcastLoc = useCallback(async () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      } else {
        let location = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 10000,
            distanceInterval: 10,
          },
          (location_update) => {
            db.collection("chats")
              .doc(roomId) //room id
              .collection("location")
              .doc(user2)
              .set({
                latitude: location_update.coords.latitude,
                longitude: location_update.coords.longitude,
                createdAt: new Date(),
              });
          }
        );
      }
    })();
    db.collection("chats")
      .doc(roomId) //room id
      .collection("messages")
      .doc(_id)
      .set({
        _id,
        createdAt: new Date(),
        text: "Heyy, i'm broadcasting my location",
        user,
      });
  }, []);
  return (
    <Actions
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
      }}
      icon={() => (
        <Image
          style={{ width: 32, height: 32 }}
          source={{
            uri: "https://placeimg.com/32/32/any",
          }}
        />
      )}
      options={{
        "Get Direction": () => {
          navigation.navigate("MapDirection");
        },
        "Go to Maps": () => {
          navigation.navigate("Maps");
        },
        "Broadcast My Location": () => {
          broadcastLoc();
        },
      }}
      optionTintColor="#222B45"
    />
  );
};

export const renderComposer = (props) => (
  <Composer
    {...props}
    textInputStyle={{
      color: "#222B45",
      backgroundColor: "#EDF1F7",
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#E4E9F2",
      paddingTop: 8.5,
      paddingHorizontal: 12,
      marginLeft: 0,
    }}
  />
);

export const renderSend = (props) => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 4,
    }}
  >
    <Image
      style={{ width: 32, height: 32 }}
      source={{
        uri: "https://placeimg.com/32/32/any",
      }}
    />
  </Send>
);
