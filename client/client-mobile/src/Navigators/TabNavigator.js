import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import SearchAllCategory from "../screens/SearchAllCategory";
import PostItem from "../screens/PostItem";
import Chat from "../screens/Chat";
import MyProfile from "../screens/Profile";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import PostCategory from "../screens/PostCategory";
import { Button, useDisclose, Actionsheet, Box, Center, Text } from "native-base";
import Notifications from "../screens/Notifications";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = focused ? "home" : "home";
              } else if (route.name === "MyProfile") {
                iconName = focused ? "user" : "user";
              } else if (route.name === "Chat") {
                iconName = focused ? "wechat" : "wechat";
              } else if (route.name === "Post") {
                iconName = focused ? "pluscircleo" : "pluscircleo";
              } else if (route.name === "Search") {
                iconName = focused ? "search1" : "search1";
              }

              return <AntDesign name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
            headerStyle: {
              backgroundColor: "#339966",
            },
            // headerShown: false,
            headerTitleStyle: {
              color: "white",
            },
          };
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={SearchAllCategory} />
        <Tab.Screen name="PostItem" component={PostItem} options={{ tabBarButton: () => <Button onPress={onOpen}>Test</Button> }} />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="MyProfile" component={MyProfile} />
        {/* <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,
        }}
      /> */}
        {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
      </Tab.Navigator>

      {/* Slider */}
      <Center>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text
                fontSize="16"
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
              >
                Pick a Category
              </Text>
            </Box>
            {/* Ini ntar flatlist dari category, sekarang HARDCODE DULU */}
            <Actionsheet.Item
              onPress={() => {
                navigation.navigate("PostItem", {
                  //! NANTI DIGANTI DARI ITEM FLATLIST YA
                  // category: item?.category,
                  category: "plastic",
                });
                onClose();
              }}
            >
              Plastic Packaging
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                navigation.navigate("PostItem", {
                  //! NANTI DIGANTI DARI ITEM FLATLIST YA
                  // category: item?.category,
                  category: "carton",
                });
                onClose();
              }}
            >
              Carton Packaging
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                navigation.navigate("PostItem", {
                  //! NANTI DIGANTI DARI ITEM FLATLIST YA
                  // category: item?.category,
                  category: "glass",
                });
                onClose();
              }}
            >
              Glass Packaging
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                navigation.navigate("PostItem", {
                  //! NANTI DIGANTI DARI ITEM FLATLIST YA
                  // category: item?.category,
                  category: "cans",
                });
                onClose();
              }}
            >
              Aluminum Cans
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                navigation.navigate("PostItem", {
                  //! NANTI DIGANTI DARI ITEM FLATLIST YA
                  // category: item?.category,
                  category: "paper",
                });
                onClose();
              }}
            >
              Paper/Cardboard
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    </>
  );
};

export default TabNavigator;
