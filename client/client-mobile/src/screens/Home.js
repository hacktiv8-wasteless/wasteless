import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, FormControl, Modal, Input, ScrollView, Center, VStack, Slide, Box } from "native-base";
import SliderModal from "./SliderModal";

export default function Home({ navigation }) {
  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
  };
  const logout = async () => {
    console.log("before", AsyncStorage.getItem("access_token"));
    await AsyncStorage.removeItem("access_token");
    console.log("after", AsyncStorage.getItem("access_token"));
  };
  const check = async () => {
    console.log(await AsyncStorage.getItem("access_token"));
    console.log(await AsyncStorage.getItem("appLaunched"));
  };

  // Modal add post
  // const [placement, setPlacement] = useState(undefined);
  // const [open, setOpen] = useState(false);

  // const openModal = (placement) => {
  //   setOpen(true);
  //   setPlacement(placement);
  // };

  const [modalVisible, setModalVisible] = React.useState(false);
  const [size, setSize] = React.useState("md");

  const handleSizeClick = (newSize) => {
    setSize(newSize);
    setModalVisible(!modalVisible);
  };

  //! modal transition
  const [isOpenBottom, setIsOpenBottom] = useState(false);

  useEffect(() => {
    // getToken();
    AsyncStorage.getItem("access_token").then((token) => console.log(">>>>>>", token));
    // console.log(token, "<<<<");
  }, []);
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button onPress={() => setIsOpenBottom(!isOpenBottom)}>asdaw</Button>
        <Text>Home</Text>
        <Button onPress={() => navigation.navigate("PostItem")} style={styles.buttonTest}>
          ke post
        </Button>
        <Button onPress={handleSizeClick}>{`Open Modal`}</Button>
        <Button onPress={() => openModal("bottom")}>Bottom modal</Button>
        <Button onPress={check} style={styles.buttonTest}>
          Check
        </Button>
        <Button onPress={logout} style={styles.buttonTest}>
          Logout
        </Button>
        <Button onPress={clearAsyncStorage} style={styles.buttonTest}>
          Clear all storage
        </Button>
      </View>
      {/* Modal */}
      <SliderModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

      <Slide in={isOpenBottom}>
        <Box
          p={10}
          _text={{
            color: "white",
          }}
          bg="blue.400"
          rounded="md"
          height={500}
        >
          I am coming from Bottom
        </Box>
      </Slide>
    </>
  );
}

const styles = StyleSheet.create({
  buttonTest: {
    marginVertical: 50,
  },

  bottom: {
    marginBottom: 0,
    marginTop: "auto",
  },
});
