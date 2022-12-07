import { StyleSheet, Text, View, TextInput, ScrollView, Image, StatusBar, TouchableOpacity, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Button, Center } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../query/Posts";
import { GET_CATEGORIES } from "../query/Categories";
import { GET_PROFILE, GET_USER_DETAIL } from "../query/Users";
import CardBanner from "../components/CardBanner";
import ItemCardSmall from "../components/ItemCardSmall";
import CategoryCard from "../components/CategoryCard";
import Loader from "../components/Loader";
import Carousel from "../components/Carousel";
import { capitalize, getToken, getUserId, signOut } from "../helpers/util";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewHome({ navigation }) {
  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
  };
  const logout = async () => {
    console.log("before", AsyncStorage.getItem("access_token"));
    await signOut("access_token");
    console.log("after", AsyncStorage.getItem("access_token"));
  };
  const check = async () => {
    console.log(await getToken("access_token"));
    console.log(await getToken("userId"));
  };

  //? SERVER WIRING
  const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_POSTS);
  const { data: categoryData, loading: categoryLoading, error: categoryError } = useQuery(GET_CATEGORIES);
  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_PROFILE);

  if (postsError || categoryError || userError) {
    console.log("postsError -------------------------");
    console.log(postsError);
    console.log("postsError -------------------------");

    console.log("categoryError -----------------------");
    console.log(categoryError);
    console.log("categoryError -----------------------");

    console.log("userData -----------------------");
    console.log(userError);
    console.log("userData -----------------------");
  }

  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (val) => setSearch(val);

  const getFilteredPost = () => {
    if (search) {
      return filtered;
    }
    return postsData?.getAllPosts;
  };

  const handleOnSubmit = () => {
    setFiltered(postsData?.getAllPosts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase())));
  };

  if (postsLoading || categoryLoading || userLoading) return <Loader />;

  return (
    <View style={{ backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView>
        {/* Loader */}

        <ScrollView>
          <Button onPress={check} style={styles.test}>
            Check
          </Button>
          <Button onPress={logout} style={styles.test}>
            Logout
          </Button>
          <Button onPress={clearAsyncStorage} style={styles.test}>
            Clear all storage
          </Button>
          <View
            style={{
              // flex: 1,
              paddingTop: 10,
              paddingHorizontal: 20,
              // alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 2,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Welcome {userData?.getProfile?.username} </Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                  <Ionicons name="location" size={24} color="gray" />
                  <Text style={{ color: "gray", marginLeft: 10 }}>Pondok Indah, South Jakarta</Text>
                </View>
              </View>
              {/* <Ionicons name="notifications" size={20} color="gray" style={{ paddingHorizontal: 20 }} />
              <Ionicons name="grid" size={20} color="gray" /> */}
              <Button onPress={() => navigation.navigate("MyProfile")} variant="unstyled">
                <Feather name="user" size={24} />
              </Button>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginVertical: 1,
                padding: 15,
                borderRadius: 30,
                backgroundColor: "#e3e3e3",
                marginVertical: 10,
              }}
            >
              <TextInput
                style={{
                  paddingHorizontal: 10,
                  flex: 1,
                }}
                value={search}
                onChangeText={handleSearchChange}
                on
                placeholder="Search Reuseable Materials"
              />
              <Pressable onPress={handleOnSubmit}>
                <Ionicons name="search" size={25} color="gray" style={{ marginRight: 10 }} />
              </Pressable>
            </View>

            {/* Category Card */}
            <View style={{ marginVertical: 10 }}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: "row" }}>
                  {categoryData?.getAllCategories?.map((item) => {
                    return <CategoryCard key={item["_id"]} item={item} />;
                  })}
                </View>
              </ScrollView>
            </View>

            {/* <CardBanner /> */}
            <Carousel />

            {/* Card */}
            <View style={{ flex: 1, marginVertical: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Near Me</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                {getFilteredPost().map((post) => {
                  return <ItemCardSmall post={post} key={post["_id"]} />;
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
