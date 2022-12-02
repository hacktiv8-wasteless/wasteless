import { Box, Text, View } from "native-base";
// import Carousel from "../components/Carousel";
import CarouselCard from "../components/CarouselCard";
import Carousel from "../components/Carousel";

export default function HomeScreen() {
  return (
    // <View className="flex-1 ">
    //   <View className="h-[200] mt-[40] p-4">
    //     <CarouselCard />
    //     {/* <Text className='text-2xl m-auto'>
    //           CAROUSEL {showStickyHead ? "muncul" : "tidak"}
    //         </Text> */}
    //   </View>
    // </View>
    <Box style={{ flex: 1 }} safeArea>
      <Carousel />
      {/* <Text>INI HOME!</Text> */}
    </Box>
  );
}
