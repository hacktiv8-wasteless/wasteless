import { Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Divider, HStack, Icon, ScrollView, VStack, Text, Center } from "native-base";
import mapPlaceHolder from "../../assets/placeHolder/mapPlaceHolder.png";
import approximateLoc from "../../assets/approximateLoc.png";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POST_DETAIL } from "../query/Posts";
import { GET_CATEGORY_ID } from "../query/Categories";
import { capitalize } from "../helpers/util";
import Loader from "../components/Loader";
import { GET_PROFILE } from "../query/Users";
import { COLORS } from "../constants";
import { CHOOSE_APPOINTMENT, GET_APPOINTMENT, POST_APPOINTMENT } from "../query/Appointment";

const MAP_PLACEHOLDER = Image.resolveAssetSource(mapPlaceHolder).uri;
const MARKER_APPROXIMATE = Image.resolveAssetSource(approximateLoc).uri;

export default function PostDetail({ navigation, route }) {
  const [mapRegion, setmapRegion] = useState(null);

  useEffect(() => {
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
            // console.log("update location!", location_update.coords, new Date());
            setmapRegion({
              latitude: location_update.coords.latitude,
              longitude: location_update.coords.longitude,
            });
          }
        );
      }
    })();
  }, []);

  useEffect(() => {
    if (postDetailData) {
      // let { giver_id, taker_id, status, category_id } = postDetailData?.getPostById;
      // giver_id = postDetailData?.getPostById?.giver_id;
      // console.log(postDetailData?.getPostById);
      // category_id = ;
      giver_id = postDetailData?.getPostById?.giver_id;
      refetch({ categoryId: postDetailData?.getPostById?.category_id });
    }
  }, [postDetailData]);

  const { id: postId } = route.params;

  const { data: postDetailData, loading: postDetailLoading, error: postDetailError } = useQuery(GET_POST_DETAIL, { variables: { postId } });
  const { data: categoryDetailData, loading: categoryDetailLoading, error: categoryDetailError, refetch } = useQuery(GET_CATEGORY_ID, { variables: null });
  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_PROFILE);
  const [appointment, { data: appointmentData, loading: appoinmentLoading, error: appointmentError }] = useMutation(POST_APPOINTMENT);
  const { data: fetchAppointmentData, loading: fetchAppointmentLoading, error: fetchAppointmentError } = useQuery(GET_APPOINTMENT, { variables: { postId } });
  const [chooseAppointment, { data: chooseAppointmentData, loading: chooseAppointmentLoading, error: chooseAppointmentError }] = useMutation(CHOOSE_APPOINTMENT);

  const userId = userData?.getProfile?.id;

  let giver_id, taker_id, status, category_id;
  // console.log(fetchAppointmentData?.getAppointment);
  // console.log("userId: ", userId, "giver_id: ", giver_id);

  const handleAppointment = async () => {
    await appointment({
      variables: { postId },
    });
    console.log("Jalaaaan appointment");
    console.log(appointmentData);
  };

  const handleChooseAppointment = async (takerId) => {
    await chooseAppointment({
      variables: {
        takerId,
        postId,
      },
    });
    console.log("Jalan chooseAppointment");
    console.log(chooseAppointmentData);
  };

  if (postDetailLoading || categoryDetailLoading || fetchAppointmentLoading) return <Loader />;
  if (postDetailError) {
    console.log(postDetailError);
  }
  if (appointmentError) {
    console.log(appointmentError);
  }
  if (fetchAppointmentError) {
    console.log(fetchAppointmentError);
  }

  return (
    <View>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.imageContainer2}>
            <Image source={{ uri: postDetailData?.getPostById?.mainImage }} style={styles.image} />
          </View>
          <View style={styles.postDetail}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.title}>{postDetailData ? capitalize(postDetailData?.getPostById?.title) : ""}</Text>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: COLORS.lightGrey,
                    padding: 10,
                    borderRadius: 15,
                    height: 40,
                    marginBottom: 10,
                    paddingHorizontal: 15,
                    shadowColor: COLORS.primaryShade[500],
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                  }}
                >
                  <Text>{postDetailData ? categoryDetailData?.getCategoryById?.name : ""}</Text>
                </View>
              </View>
              {/* <Button onPress={() => console.log("jalan delete")} variant="unstyled">
                <Feather name="trash-2" size={24} color="red" />
              </Button> */}
            </View>

            <View>
              {/* <Text>Placeholder biar gampang:</Text> */}
              <Text>Total harga: {postDetailData?.getPostById?.quantity * categoryDetailData?.getCategoryById?.price}</Text>
              {/* <Text>Lat: {postDetailData?.getPostById?.lat}</Text>
              <Text>Long: {postDetailData?.getPostById?.long}</Text>
              <Text>Giver_id: {postDetailData?.getPostById?.giver_id}</Text>
              <Text>Status: {postDetailData?.getPostById?.status}</Text> */}
              <Text>{postDetailData ? capitalize(postDetailData?.getPostById?.description) : ""}</Text>
            </View>
            {/* <Text style={styles.subTitle}>Photos</Text> */}
          </View>
          <View style={styles.mapDetail}>
            <View style={styles.mapContainer}>
              {/* <Text style={styles.subTitle}>Location</Text> */}
              <MapView
                style={{ ...StyleSheet.absoluteFillObject }}
                showsUserLocation={true}
                // followUserLocation={true}
                loadingEnabled={true}
                region={{
                  ...mapRegion,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }}
              >
                {mapRegion && <Marker coordinate={mapRegion} style={{ ...StyleSheet.absoluteFillObject }} image={{ uri: MARKER_APPROXIMATE }} />}
              </MapView>
              {/* <Image source={{ uri: MAP_PLACEHOLDER }} style={styles.image} /> */}
            </View>
          </View>
          {/* <View style={{ alignItems: "center" }}>
        <Button style={styles.button}>Set Appointment</Button>
      </View> */}
          {userId === postDetailData?.getPostById?.giver_id ? (
            <>
              <View style={styles.postDetail}>
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.label}>Buyer</Text>
                  <View style={{}}>
                    <View style={{ flexDirection: "row", height: 45 }}>
                      <Text style={styles.tabelHead}>Username</Text>
                      <Text style={styles.tabelHead}>Action</Text>
                    </View>
                    {fetchAppointmentData?.getAppointment.map((e) => {
                      // console.log(e);
                      return (
                        <View style={{ flexDirection: "row", height: 45 }}>
                          <Text style={{ flex: 1, textAlign: "center" }}>{e.username}</Text>
                          <Pressable onPress={() => handleChooseAppointment(e._id)} style={{ flex: 1 }}>
                            <Feather style={{ textAlign: "center" }} name="user" size={24} color={COLORS.dark} />
                          </Pressable>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            </>
          ) : (
            <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
              <Button isLoading={appoinmentLoading} onPress={handleAppointment} height={75} borderRadius={20} bgColor={COLORS.primary}>
                <Text style={styles.button}>Set Appointment</Text>
              </Button>
            </View>
          )}

          <>{/* Tempatnya conditional rendering appointment */}</>
          {/* <Button onPress={() => console.log("Jalan appointment")} height={100}>
            Set Appointment
          </Button> */}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  mapContainer: {
    overflow: "hidden",
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  imageContainer2: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: COLORS.white,
    height: 300,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: COLORS.primaryShade[500],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
  },
  postDetail: {
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    // borderTopColor: "gray",
    shadowColor: COLORS.primaryShade[500],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
  },
  mapDetail: {
    marginHorizontal: 20,
    marginBottom: 20,
    // padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    // borderTopColor: "gray",
    shadowColor: COLORS.primaryShade[500],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
  },
  // imageContainer: {
  //   overflow: "hidden",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   // height: 100,
  //   // width: 100,
  //   borderRadius: 15,
  // },
  image: { height: "100%", width: "100%", resizeMode: "cover" },
  category: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#444444",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    lineHeight: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
  },
  // button: {
  //   height: 50,
  //   borderRadius: 50,
  //   width: 200,
  // },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tabelHead: { fontSize: 16, fontWeight: "600", flex: 1, textAlign: "center", backgroundColor: COLORS.lightGrey, paddingTop: 10 },
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
