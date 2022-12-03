import { Box, FlatList, Text, View } from "native-base";
import SearchBar from "../components/SearchBar";
import CategorySearch from "../components/ItemCardLarge";

export default function Categories() {
  return (
    <Box style={{ flex: 1 }} safeArea>
      <SearchBar />

      {/* <Text>INI HOME!</Text> */}
      <CategorySearch />
    </Box>
  );
}
