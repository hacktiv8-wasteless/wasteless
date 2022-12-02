import { Box, FlatList, Text, View } from "native-base";
import Carousel from "../components/Carousel";
import CardMenu from "../components/ItemCardSmall";
import SearchBar from "../components/SearchBar";
import CategoryList from "../components/CategoryHome";

export default function HomeScreen() {
  return (
    <Box style={{ flex: 1 }} safeArea>
      <SearchBar />
      <Carousel />
      {/* <Text>INI HOME!</Text> */}
      <CategoryList />

      <CardMenu />
    </Box>
  );
}
