import { StyleSheet, View, Image, TouchableHighlight, StatusBar, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack, Text, FormControl, Input, Button, TextArea, Slider, Box, Center, WarningOutlineIcon, Pressable, ScrollView } from "native-base";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location";
import { useMutation } from "@apollo/client";
import { GET_POSTS, POST_POST } from "../query/Posts";
import { getUserId } from "../helpers/util";
import { COLORS } from "../constants";

export default function PostItem({ navigation, route }) {
  const { categoryId: category_id } = route.params;
  const { price } = route.params;
  // console.log(price);
  const [userId, setUserId] = useState(null);

  const userIdGetter = async () => {
    const data = await getUserId();
    setUserId(Number(data));
  };

  //? Image picker --------------------------
  const [profileImage, setProfileImage] = useState("");
  const url = "https://wasteless-services-upload.up.railway.app/";

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // console.log(await ImagePicker.requestMediaLibraryPermissionsAsync());

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.cancelled) {
        setProfileImage(response.uri);
      }
    }
  };

  const uploadProfileImage = async () => {
    const formData = new FormData();
    formData.append("image", {
      name: new Date() + "_profile",
      uri: profileImage,
      type: "image/jpg",
    });

    try {
      const { data } = await axios.post(url, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      return data.url;
    } catch (error) {
      console.log(error);
    }
  };

  //? -------------------------------------------

  //? Server Wiring --------------------------
  const [createPost, { data: postData, loading: postLoading, error: postError }] = useMutation(POST_POST, { refetchQueries: [{ query: GET_POSTS }] });

  // const [mainImage, setMainImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(5);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [userLatLon, setUserLatLon] = useState(null);
  const [userLoc, setUserLoc] = useState("");

  // const handleImageChange = (val) => setMainImage(val);
  const handleTitleChange = (val) => setTitle(val);
  const handleDescriptionChange = (val) => setDescription(val);
  const handleQuantityChange = (val) => setQuantity(val);
  const handleLoc = (val) => setUserLoc(val);

  const onSubmit = async () => {
    try {
      const mainImage = await uploadProfileImage();

      const postPayload = {
        category_id,
        mainImage,
        title,
        description,
        quantity: +quantity,
        // RIZZZZQIII NANTI DISINI YAA
        lat: lat.toString(),
        long: long.toString(),
      };

      await createPost({
        variables: { postPayload },
      });
      console.log("postData", postData);

      // Clear form
      // setMainImage("");
      setProfileImage("");
      setTitle("");
      setDescription("");
      setQuantity("");

      navigation.navigate("MyListingNavigator");
      // setLat("");
      // setLong("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        } else {
          let location = await Location.getCurrentPositionAsync();

          setLat(location.coords.latitude);
          setLong(location.coords.longitude);
          setUserLatLon({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleMarker = (e) => {
    setLat(e.nativeEvent.coordinate.latitude);
    setLong(e.nativeEvent.coordinate.longitude);
    setUserLatLon(e.nativeEvent.coordinate);
  };

  const handleInput = async () => {
    try {
      Geocoder.init("AIzaSyCVVWasvqI_muG_92Mdo63Ik14SZ6bLlCo", {
        language: "id",
      });
      const loc = await Geocoder.from(userLoc);
      const coords = loc.results[0].geometry.location;
      setLat(coords.lat);
      setLong(coords.lng);
      setUserLatLon({ latitude: coords.lat, longitude: coords.lng });
    } catch (error) {
      console.log(error);
    }
  };

  // if (postLoading) return <Text>Loading......</Text>;

  if (postError) {
    console.log(postError);
    // return <Text>Error: {postError}</Text>;
  }

  useEffect(() => {
    userIdGetter();
  }, []);

  return (
    <>
      {/* Status Bar */}
      {/* <StatusBar barStyle="light-content" backgroundColor="#339966" /> */}
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {/* Image handler */}
          {/* <Image source={{ uri: "http://placekitten.com/150/150" }} style={styles.image} /> */}
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 20,
              marginBottom: 20,
              borderRadius: 20,
              overflow: "hidden",
              backgroundColor: COLORS.white,
              shadowColor: COLORS.primaryShade[500],
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <TouchableOpacity onPress={openImageLibrary}>
              <View style={{ backgroundColor: "white", paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }}>
                <Text style={styles.label}>Upload Image:</Text>
              </View>
              <View style={styles.imageContainer2}>
                {/* <Text>Add Image here</Text> */}
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.image} />
                ) : (
                  <Image source={{ uri: "https://uploader-assets.s3.ap-south-1.amazonaws.com/codepen-default-placeholder.png" }} style={styles.image} />
                  // <Text
                  //   style={{
                  //     textAlign: "center",
                  //     fontSize: 20,
                  //     opacity: 0.3,
                  //     fontWeight: "bold",
                  //   }}
                  // >
                  //   Upload Imagesss
                  // </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <VStack style={styles.formContainer}>
            <FormControl isRequired marginBottom={3}>
              <Text style={styles.label}>Title</Text>
              <Input placeholder="Title" w="100%" borderRadius={14} backgroundColor="white" value={title} onChangeText={handleTitleChange} />
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
              <Slider onChange={handleQuantityChange} defaultValue={5} minValue={1} maxValue={10} step={1}>
                <Slider.Track bgColor={COLORS.muted}>
                  <Slider.FilledTrack color={"red.100"} bgColor={COLORS.primary} />
                </Slider.Track>
                <Slider.Thumb bgColor={COLORS.primary} />
              </Slider>
            </FormControl>
          </VStack>

          <View
            style={{
              backgroundColor: "white",
              marginHorizontal: 20,
              marginBottom: 20,
              borderRadius: 20,
              shadowColor: COLORS.primaryShade[500],
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <View>
              <View
                style={{
                  padding: 20,
                }}
              >
                <Text style={styles.label}>Location</Text>
                <Input placeholder="Location" w="100%" backgroundColor="white" borderRadius={14} value={userLoc} onChangeText={handleLoc} onEndEditing={handleInput} />
              </View>
            </View>
            <View style={styles.mapsContainer}>
              <View style={{ height: "100%" }}>
                <MapView
                  style={{ ...StyleSheet.absoluteFillObject }}
                  showsUserLocation={true}
                  // followUserLocation={true}
                  loadingEnabled={true}
                  region={{
                    ...userLatLon,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                  }}
                >
                  {userLatLon && <Marker draggable coordinate={userLatLon} style={{ ...StyleSheet.absoluteFillObject }} onDragEnd={handleMarker} />}
                </MapView>
              </View>
            </View>
          </View>

          <View style={styles.totalPrice}>
            <Text style={styles.label}>Total Price: </Text>
            <Text style={styles.label}>Rp.{quantity * price}</Text>
          </View>

          <View
            style={{
              marginBottom: 20,
              marginHorizontal: 20,
              shadowColor: COLORS.primaryShade[500],
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <Button isLoading={postLoading ? true : false} onPress={onSubmit} height={75} borderRadius={20} bgColor={COLORS.primary}>
              <Text style={styles.button}>Submit</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: COLORS.lightGrey,
  },
  imageContainer: {
    // height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    overflow: "hidden",
    // height: "100%",
  },
  imageContainer2: {
    overflow: "hidden",
    backgroundColor: "white",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { height: "100%", width: "100%", resizeMode: "cover" },
  imagePlaceholder: {
    height: 150,
    width: 150,
  },
  formContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 20,
    padding: 20,
    backgroundColor: "white",
    marginBottom: 20,

    shadowColor: COLORS.primaryShade[500],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
  },
  mapsContainer: {
    backgroundColor: "white",
    // flex: 1,
    height: 300,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
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
  totalPrice: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,

    shadowColor: COLORS.primaryShade[500],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    color: COLORS.accent,
    fontWeight: "500",
    fontSize: 16,
    shadowColor: COLORS.primaryShade[500],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
