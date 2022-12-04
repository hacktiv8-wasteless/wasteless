import { StyleSheet, View, Image, TouchableHighlight, StatusBar } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack, Text, FormControl, Input, Button, TextArea, Slider, Box, Center, WarningOutlineIcon, Pressable } from "native-base";

export default function PostItem({ navigation, route }) {
  const { category } = route.params;
  // const giver_id = //! id dari jwt
  // const status //! ini harusnya otomatis dari server jadi pending

  const [errors, setErrors] = React.useState({});

  const [mainImage, setMainImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0.5);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const handleImageChange = (val) => setMainImage(val);
  const handleTitleChange = (val) => setTitle(val);
  const handleDescriptionChange = (val) => setDescription(val);
  const handleQuantityChange = (val) => setQuantity(val);
  const handleLatChange = (val) => setLat(val);
  const handleLongChange = (val) => setLong(val);

  const onSubmit = () => {
    //! ganti nama payload sesuai dg graphql
    const payload = {
      mainImage,
      title,
      description,
      quantity,
      lat,
      long,
    };
    console.log(payload);
    navigation.navigate("Home");

    // Clear form
    setMainImage("");
    setTitle("");
    setDescription("");
    setQuantity("");
    setLat("");
    setLong("");
  };

  return (
    <>
      {/* Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="#339966" />

      <SafeAreaView style={styles.container}>
        {/* <Text>{category}</Text> */}

        <View style={styles.imageContainer}>
          <Text>Add Image here</Text>
          <Pressable>
            <Image source={{ uri: "http://placekitten.com/150/150" }} style={styles.imagePlaceholder} resizeMode="cover" />
          </Pressable>
        </View>
        <VStack style={styles.formContainer}>
          <FormControl isRequired marginBottom={3}>
            <Text style={styles.label}>Title</Text>
            <Input placeholder="Title" w="100%" variant="rounded" backgroundColor="white" value={title} onChangeText={handleTitleChange} />
          </FormControl>

          <FormControl isRequired marginBottom={3}>
            <Text style={styles.label}>Description</Text>
            <TextArea h={20} placeholder="e.g. 2kg plastic bottles" backgroundColor="white" borderRadius={15} value={description} onChangeText={handleDescriptionChange} />
          </FormControl>

          <FormControl isRequired>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Quantity: </Text>
              <Text>{quantity}kg</Text>
            </View>
            <Slider onChange={handleQuantityChange} defaultValue={1} minValue={0.5} maxValue={5} step={0.5} colorScheme="green">
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
          </FormControl>
        </VStack>

        <VStack style={styles.mapsContainer}>
          <Pressable>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Box
                  bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "white"}
                  // p="5"
                  height="full"
                  borderWidth="1"
                  borderColor="coolGray.300"
                  maxHeight={70}
                >
                  <View style={{ padding: 20, flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.label}>Your location (approx)</Text>
                    <Text style={styles.label}>Next</Text>
                  </View>
                </Box>
              );
            }}
          </Pressable>
        </VStack>

        <VStack style={styles.footer}>
          <Button onPress={onSubmit} bgColor={"#339966"} width={"full"} height={75} borderRadius={0}>
            Submit
          </Button>
          {/* Kalo udah sambung server bisa tambah ini buat loading mutation */}
          {/* <Button isLoading>Button</Button> */}

          {/* <TouchableHighlight onPress={onSubmit}>
          <View style={{ alignItems: "center", backgroundColor: "#339966", height: 100 }}>
          <Text style={{ color: "white" }}>Submit</Text>
          </View>
        </TouchableHighlight> */}
        </VStack>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  imageContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    overflow: "hidden",
  },
  imagePlaceholder: {
    height: 150,
    width: 150,
  },
  formContainer: {
    paddingVertical: 20,
    padding: 20,
    backgroundColor: "white",
    marginBottom: 20,
  },
  mapsContainer: {
    backgroundColor: "white",
    flex: 1,
    height: 300,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
