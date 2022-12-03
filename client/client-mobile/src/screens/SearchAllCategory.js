import { Box, FlatList, Text, View } from "native-base";
import Carousel from "../components/Carousel";
import CardMenu from "../components/ItemCardSmall";
import SearchBar from "../components/SearchBar";
import AllCategory from "../components/CategoryCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryScreen() {
  return (
    <Box style={{ flex: 1 }} safeArea>
      <View>
        <SearchBar />
        {/* <Text>INI HOME!</Text> */}
        <AllCategory />
      </View>
    </Box>
  );
}
