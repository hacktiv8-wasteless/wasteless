import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import SearchAllCategory from "../screens/SearchAllCategory";
import PostItem from "../screens/PostItem";
import Chat from "../screens/Chat";
import MyProfile from "../screens/Profile";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import PostCategory from "../screens/PostCategory";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
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
          headerShown: false,
        };
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchAllCategory} />
      <Tab.Screen name="Post" component={PostCategory} />
      <Tab.Screen name="Chat" component={Chat} />
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
  );
};

export default TabNavigator;
