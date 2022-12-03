import { Box, FlatList, Text, View } from "native-base";
import SearchBar from "../components/SearchBar";
import CategorySearch from "../components/ItemCardLarge";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Categories() {
  return (
    <SafeAreaView>
      <SearchBar />

      {/* <Text>INI HOME!</Text> */}
      <CategorySearch />
    </SafeAreaView>
  );
}
