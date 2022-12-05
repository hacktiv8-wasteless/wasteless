import { Box, FlatList, ScrollView, Text, View } from "native-base";
import Carousel from "../components/Carousel";
import CardMenu from "../components/ItemCardSmall";
import SearchBar from "../components/SearchBar";
import AllCategory from "../components/CategoryCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryScreen() {
  const locations = ["Plastic", "Cardboard", "Paper", "Alumunium can", "Glass"];
  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <View>
        <SearchBar />
        {/* <Text>INI HOME!</Text> */}
        {/* <AllCategory /> */}
        <View style={{ marginVertical: 10 }}>
          <View style={{ padding: 20 }}>
            <FlatList
              data={locations}
              numColumns={3}
              renderItem={({ item }) => (
                <View key={item} style={{ borderWidth: 0.5, borderColor: "gray", marginRight: 20, marginVertical: 10, padding: 10, borderRadius: 40 }}>
                  <Text>{item}</Text>
                </View>
              )}
              keyExtractor={({ item }) => item}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
