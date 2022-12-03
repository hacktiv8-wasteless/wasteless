import { Box, FlatList, Text, View } from "native-base";
import Carousel from "../components/Carousel";
import CardMenu from "../components/ItemCardSmall";
import SearchBar from "../components/SearchBar";
import CategoryList from "../components/CategoryHome";

export default function HomeScreen() {
  return (
    <View>
      <SearchBar />
      <Carousel />
      {/* <Text>INI HOME!</Text> */}
      <CategoryList />

      <CardMenu />
    </View>
  );
}
