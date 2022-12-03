import { Box, FlatList, Text, View } from "native-base";
import SearchBar from "../components/SearchBar";
import CategorySearch from "../components/ItemCardLarge";

export default function Categories() {
  return (
    <View>
      <SearchBar />

      {/* <Text>INI HOME!</Text> */}
      <CategorySearch />
    </View>
  );
}
