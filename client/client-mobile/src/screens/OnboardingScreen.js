import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Onboarding from "react-native-onboarding-swiper";
import * as Location from "expo-location";

export default function OnboardingScreenr({ navigation }) {
  const Done = ({ ...props }) => (
    <TouchableOpacity title="Done" {...props} style={{ marginHorizontal: 10 }}>
      <Text style={styles.done}>Done</Text>
    </TouchableOpacity>
  );
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       return;
  //     }
  //   })();
  // }, []);
  return (
    <Onboarding
      onSkip={() => navigation.replace("Register")}
      onDone={() => navigation.navigate("Register")}
      DoneButtonComponent={Done}
      pages={[
        {
          backgroundColor: "#88E3B6",
          image: <Image source={require("../../assets/png/share.png")} resizeMode="contain" style={styles.image} />,
          title: "Welcome to Wasteless!",
          subtitle: "",
        },
        {
          backgroundColor: "#55C68E",
          image: <Image source={require("../../assets/png/photo.png")} style={styles.image} />,
          title: "Permission storage",
          subtitle: "W are using your storage permission to upload photos",
        },
        {
          backgroundColor: "#339966",
          image: <Image source={require("../../assets/png/location1.png")} style={styles.image} />,
          title: "Permission location",
          subtitle: "Find nearby reuseable waste",
        },
        {
          backgroundColor: "#316C4E",
          image: <Image source={require("../../assets/png/connect2.png")} style={styles.image} />,
          title: "You are ready!",
          subtitle: "Please sign in or sign up to continue",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    height: 400,
    width: 400,
  },
  done: { fontSize: 16, color: "#ffffff" },
});
