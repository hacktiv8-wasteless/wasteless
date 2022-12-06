import { Box, FlatList, ScrollView, Text, View } from "native-base";
import SearchBar from "../components/SearchBar";
import CategorySearch from "../components/ItemCardLarge";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../components/Loader";
import { useQuery } from "@apollo/client";
import { GET_POST_BY_CATEGORY } from "../query/Posts";
import ItemCardSmall from "../components/ItemCardSmall";

export default function Categories({ route }) {
  const { categoryId } = route.params;

  const { data: postsByCategoryData, loading: postsByCategoryLoading, error: postByCategoryError } = useQuery(GET_POST_BY_CATEGORY, { variables: { categoryId } });

  if (postByCategoryError) {
    console.log("postByCategoryError ---------------------");
    console.log(postByCategoryError);
    console.log("postByCategoryError ---------------------");
  }
  if (postsByCategoryLoading) return <Loader />;

  // console.log(postsByCategoryData?.getPostByCategory);

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "white" }}>
      <SafeAreaView>
        {/* <Text>INI HOME!</Text> */}
        {/* <CategorySearch /> */}
        <ScrollView>
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Category Filter:</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" }}>
              {postsByCategoryData?.getPostByCategory?.map((post) => (
                <ItemCardSmall post={post} key={post["_id"]} />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
