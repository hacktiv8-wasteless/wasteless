import { StyleSheet, Text, View, TextInput, ScrollView, Image, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Button, Center } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../query/Posts";
import { GET_CATEGORIES } from "../query/Categories";
import CardBanner from "../components/CardBanner";
import ItemCardSmall from "../components/ItemCardSmall";
import CategoryCard from "../components/CategoryCard";
import Loader from "../components/Loader";

export default function NewHome({ navigation }) {
  const categories = ["Plastic", "Cardboard", "Paper", "Alumunium can", "Glass"];
  const posts = [
    { id: 1, title: "Botol Aqua bekas" },
    { id: 2, title: "Botol sabun" },
    { id: 3, title: "Kardus makanan" },
    { id: 4, title: "Kaleng minuman bekas" },
    { id: 5, title: "Kertas bekas skripsi" },
    { id: 6, title: "Kumpulan botol minuman bekas" },
    { id: 7, title: "Kucing liar" },
    { id: 8, title: "Tisu bekas" },
    { id: 9, title: "Kardus belanja olshop" },
    { id: 10, title: "Kaleng fanta" },
  ];

  //? SERVER WIRING
  const { loading: postsLoading, error: postsError, data: postsData } = useQuery(GET_POSTS);
  const { data: categoryData, loading: categoryLoading, error: categoryError } = useQuery(GET_CATEGORIES);

  if (postsLoading || categoryLoading) return <Loader />;
  if (postsError || categoryError) {
    console.log("postsError -------------------------");
    console.log(postsError);
    console.log("postsError -------------------------");

    console.log("categoryError -----------------------");
    console.log(categoryError);
    console.log("categoryError -----------------------");

    // return <Text>Error: {postsError ? postsError : categoryError}</Text>;
  }

  return (
    <View style={{ backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView>
        {/* Loader */}

        <ScrollView>
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
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Welcome Adryan</Text>
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
              <Ionicons name="search" size={20} color="gray" />
              <TextInput
                style={{
                  paddingHorizontal: 10,
                  flex: 1,
                }}
                placeholder="Search Reuseable Materials"
              />
              <Ionicons name="filter" size={20} color="gray" />
            </View>

            <View style={{ marginVertical: 10 }}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: "row" }}>
                  {categories.map((item) => (
                    <CategoryCard item={item} />
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Banner */}
            <CardBanner />

            {/* Card */}
            <View style={{ flex: 1, marginVertical: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Near Me</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                {posts.map((post) => {
                  return <ItemCardSmall post={post} />;
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
