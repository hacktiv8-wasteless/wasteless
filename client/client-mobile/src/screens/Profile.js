import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import {
  // Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Avatar } from "native-base";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../query/Users";
import { useNavigation } from "@react-navigation/native";
import Loader from "../components/Loader";
import { capitalize, signOut } from "../helpers/util";
import { COLORS } from "../constants";
const Profile = () => {
  const navigation = useNavigation();

  const {
    data: userDetailData,
    loading: userDetailLoading,
    error: userDetailError,
  } = useQuery(GET_PROFILE);

  if (userDetailLoading) return <Loader />;
  if (userDetailError) {
    console.log("postsError -------------------------");
    console.log(userDetailError);
    console.log("postsError -------------------------");

    // return <Text>Error: {userDetailError}</Text>;
  }
  // console.log(userDetailData?.getProfile);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          {/* <Avatar.Image
            source={{
              uri: "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000",
            }}
            size={80}
          /> */}
          <Avatar size={"80px"} bg={COLORS.accent}>
            <Text
              style={{
                fontSize: 35,
                fontWeight: "600",
                color: COLORS.dark,
              }}
            >
              {capitalize(userDetailData?.getProfile?.username).charAt(0)}
            </Text>
          </Avatar>
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {capitalize(userDetailData?.getProfile?.username)}
            </Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Entypo name="location" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {userDetailData?.getProfile?.address}
          </Text>
        </View>
        <View style={styles.row}>
          <Entypo name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {userDetailData?.getProfile?.phoneNumber}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {userDetailData?.getProfile?.email}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>Rp.{userDetailData?.getProfile?.balance}</Title>
          <Caption>Wallet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>12</Title>
          <Caption>Orders</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="green" size={25} />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("Payment")}>
          <View style={styles.menuItem}>
            <AntDesign name="wallet" color="green" size={25} />
            <Text style={styles.menuItemText}>TopUp</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("HistoryLogs")}>
          <View style={styles.menuItem}>
            <Icon name="history" color="green" size={25} />
            <Text style={styles.menuItemText}>History Logs</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={async () => {
            await signOut();
            navigation.replace("Login");
          }}
        >
          <View style={styles.menuItem}>
            <AntDesign name="logout" color="green" size={25} />
            <Text style={styles.menuItemText}>logout</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("ScanQR")}>
          <View style={styles.menuItem}>
            <AntDesign name="scan1" color="green" size={25} />
            <Text style={styles.menuItemText}>Scan Here</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});

export default Profile;
