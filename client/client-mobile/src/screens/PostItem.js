import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  VStack,
  Text,
  FormControl,
  Input,
  Button,
  TextArea,
  Slider,
  Box,
  Center,
  WarningOutlineIcon,
  Pressable,
  ScrollView,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import * as Location from "expo-location";

export default function PostItem({ navigation, route }) {
  const { category } = route.params;
  // const giver_id = //! id dari jwt
  // const status //! ini harusnya otomatis dari server jadi pending

  //? Image picker
  const [profileImage, setProfileImage] = useState("");
  const [progress, setProgress] = useState(0);
  // const { token } = props.route.params;
  const url = "https://f1f7-139-228-111-125.ap.ngrok.io/";

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // console.log(await ImagePicker.requestMediaLibraryPermissionsAsync());
    // // {"canAskAgain": true, "expires": "never", "granted": true, "status": "granted"}
    // console.log(status);
    // // granted

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      console.log("-------------------------");
      console.log(response);
      // {
      //   assets: [
      //     {
      //       assetId: null,
      //       base64: null,
      //       duration: null,
      //       exif: null,
      //       height: 410,
      //       rotation: null,
      //       type: "image",
      //       uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540leonardhw%252FAwesomeProject/ImagePicker/fb6cc59d-f1f5-4fce-98a2-d5841c887615.png",
      //       width: 410,
      //     },
      //   ],
      //   canceled: false,
      //   cancelled: false,
      // };
      console.log("-------------------------");

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
    console.log("FORM DATA ----------------------------");
    console.log(formData["_parts"]);
    console.log("FORM DATA ----------------------------");

    try {
      // const res = await client.post("/upload-profile", formData, {
      const res = await axios.post(url, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          // authorization: `JWT ${token}`,
        },
      });
      console.log("aawdawdadawd");
      console.log(res);
      // if (res.data.success) {
      //   props.navigation.dispatch(StackActions.replace("UserProfile"));
      // }
      console.log("---------------");
      console.log(res);
      console.log("---------------");
    } catch (error) {
      console.log("gggggggggg");
      console.log(error);
      console.log(error.message);
    }
  };

  //? -------------------------------------------

  const [errors, setErrors] = React.useState({});

  const [mainImage, setMainImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0.5);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [userLatLon, setUserLatLon] = useState(null);
  const [userLoc, setUserLoc] = useState("");

  const handleImageChange = (val) => setMainImage(val);
  const handleTitleChange = (val) => setTitle(val);
  const handleDescriptionChange = (val) => setDescription(val);
  const handleQuantityChange = (val) => setQuantity(val);
  const handleLoc = (val) => setUserLoc(val);

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
    setLong(e.nativeEvent.coordinate.langitude);
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

  return (
    <>
      {/* Status Bar */}
      {/* <StatusBar barStyle="light-content" backgroundColor="#339966" /> */}
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <ScrollView>
          <View style={styles.imageContainer}>
            {/* Image handler */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={openImageLibrary}
                style={{
                  height: 125,
                  width: 125,
                  borderRadius: 125 / 2,
                  justifyContent: "center",
                  alignItems: "center",
                  borderStyle: "dashed",
                  borderWidth: 1,
                  overflow: "hidden",
                }}
              >
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      opacity: 0.3,
                      fontWeight: "bold",
                    }}
                  >
                    Upload Profile Image
                  </Text>
                )}
              </TouchableOpacity>
              {profileImage ? (
                <Text
                  onPress={uploadProfileImage}
                  style={[
                    styles.skip,
                    {
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: 8,
                    },
                  ]}
                >
                  Upload
                </Text>
              ) : null}
            </View>
            {/* <Text>Add Image here</Text> */}
            {/* <Pressable>
            <Image source={{ uri: "http://placekitten.com/150/150" }} style={styles.imagePlaceholder} resizeMode="cover" />
          </Pressable> */}
          </View>
          <VStack style={styles.formContainer}>
            <FormControl isRequired marginBottom={3}>
              <Text style={styles.label}>Title</Text>
              <Input
                placeholder="Title"
                w="100%"
                variant="rounded"
                backgroundColor="white"
                value={title}
                onChangeText={handleTitleChange}
              />
            </FormControl>

            <FormControl isRequired marginBottom={3}>
              <Text style={styles.label}>Description</Text>
              <TextArea
                h={20}
                placeholder="e.g. 2kg plastic bottles"
                backgroundColor="white"
                borderRadius={15}
                value={description}
                onChangeText={handleDescriptionChange}
              />
            </FormControl>

            <FormControl isRequired>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.label}>Quantity: </Text>
                <Text>{quantity}kg</Text>
              </View>
              <Slider
                onChange={handleQuantityChange}
                defaultValue={1}
                minValue={0.5}
                maxValue={5}
                step={0.5}
                colorScheme="green"
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
            </FormControl>
          </VStack>

          <VStack style={styles.mapsContainer}>
            <Box
              height="full"
              borderWidth="1"
              borderColor="coolGray.300"
              maxHeight={70}
            >
              <View
                style={{
                  padding: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* <Text>Your location (approx)</Text> */}
                <Input
                  placeholder="Location"
                  w="100%"
                  backgroundColor="white"
                  value={userLoc}
                  onChangeText={handleLoc}
                  onEndEditing={handleInput}
                />
                {/* <Text style={styles.label}>Next</Text> */}
              </View>
            </Box>
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
                {userLatLon && (
                  <Marker
                    draggable
                    coordinate={userLatLon}
                    style={{ ...StyleSheet.absoluteFillObject }}
                    onDragEnd={handleMarker}
                  />
                )}
              </MapView>
            </View>
          </VStack>

          <VStack style={styles.footer}>
            <Button
              onPress={onSubmit}
              bgColor={"#339966"}
              width={"full"}
              height={75}
              borderRadius={0}
            >
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
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#eeeeee",
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
