import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../configs/firebase";

export default function Chat() {
  const user1 = "1";
  const user2 = "2";

  let roomId = user1 < user2 ? user1 + user2 : user2 + user1;

  const [messages, setMessages] = useState([]);

  async function observer() {
    const docs = db
      .collection("chats")
      .doc(roomId)
      .collection("messages")
      .orderBy("createdAt", "desc");
    const observer = docs.onSnapshot(
      (querySnapshot) => {
        setMessages(
          querySnapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        );
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }

  useEffect(() => {
    observer();
  }, []);

  const onSend = useCallback(async (messages) => {
    const { _id, createdAt, text, user } = messages[0];
    await db
      .collection("chats")
      .doc(roomId)
      .collection("messages")
      .doc(_id)
      .set({ _id, createdAt, text, user });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user1,
        name: "tes",
        avatar:
          "https://i.pinimg.com/originals/dc/71/5b/dc715b37f20c4e478d5bec142c2aca6a.jpg",
      }}
    />
  );
}

const styles = StyleSheet.create({});
