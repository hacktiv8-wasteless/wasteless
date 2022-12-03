import { Box, FlatList, Text, View } from "native-base";
import Carousel from "../components/Carousel";
import CardMenu from "../components/ItemCardSmall";
import SearchBar from "../components/SearchBar";
import AllCategory from "../components/CategoryCard";

export default function CategoryScreen() {
  return (
    <Box style={{ flex: 1 }} safeArea>
      <SearchBar />
      {/* <Text>INI HOME!</Text> */}
      <AllCategory />
    </Box>
  );
}
