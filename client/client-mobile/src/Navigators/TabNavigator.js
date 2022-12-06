import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchAllCategory from "../screens/SearchAllCategory";
import { Feather } from "@expo/vector-icons";
import PostCategory from "../screens/PostCategory";
import { Button, useDisclose, Actionsheet, Box, Center, Text, View } from "native-base";
import Notifications from "../screens/Notifications";
import TopTabNavigator from "./TopTabNavigator";
import { COLORS } from "../constants";
import { StyleSheet } from "react-native";
import HomeNavigator from "./HomeNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <>
      <Tab.Navigator
        initialRouteName="HomeStack"
        screenOptions={({ route }) => {
          return {
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              color = COLORS.primaryShade[500];
              if (route.name === "HomeStack") {
                iconName = focused ? "home" : "home";
                color = focused ? COLORS.primary : COLORS.primaryShade[500];
              } else if (route.name === "MyListing") {
                iconName = focused ? "package" : "package";
                color = focused ? COLORS.primary : COLORS.primaryShade[500];
              } else if (route.name === "Notifications") {
                iconName = focused ? "message-circle" : "message-circle";
                color = focused ? COLORS.primary : COLORS.primaryShade[500];
              } else if (route.name === "Post") {
                iconName = focused ? "pluscircleo" : "pluscircleo";
                color = focused ? COLORS.primary : COLORS.primaryShade[500];
              } else if (route.name === "Search") {
                iconName = focused ? "search" : "search";
                color = focused ? COLORS.primary : COLORS.primaryShade[500];
              }

              return <Feather name={iconName} size={size} color={color} />;
              // <AntDesign name={iconName} size={size} color={color} />;
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: "gray",
            headerStyle: {
              backgroundColor: COLORS.white,
            },
            headerTitleStyle: {
              color: COLORS.primaryShade[500],
            },
            headerTitleAlign: "center",
            tabBarStyle: {
              height: 75,
            },
            tabBarHideOnKeyboard: true,
          };
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeNavigator}
          options={{
            headerShown: false,
            headerRight: () => (
              <View style={[styles.buttonContainer, styles.headerButton]}>
                <Button onPress={() => navigation.navigate("MyProfile")} variant="unstyled">
                  <Feather name="user" size={24} />
                </Button>
              </View>
            ),
          }}
        />
        <Tab.Screen name="Search" component={SearchAllCategory} />
        <Tab.Screen
          name="PostNavigator"
          component={PostCategory}
          options={{
            tabBarButton: () => (
              <View style={styles.buttonContainer}>
                <Button onPress={onOpen} variant="unstyled" style={styles.button}>
                  <Feather name="plus" size={24} color={COLORS.accent} />
                </Button>
              </View>
            ),
            title: "Post",
          }}
        />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="MyListing" component={TopTabNavigator} options={{ title: "My Listing" }} />
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
                navigation.navigate("Post", {
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
                navigation.navigate("Post", {
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
                navigation.navigate("Post", {
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
                navigation.navigate("Post", {
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
                navigation.navigate("Post", {
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

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 10,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.primaryShade[500],
    borderRadius: 15,
    height: 50,
    width: 50,
  },
});
