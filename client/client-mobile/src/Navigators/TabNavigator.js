import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import SearchAllCategory from "../screens/SearchAllCategory";
import Categories from "../screens/SearchByCategory";
import PostItem from "../screens/PostItem";
import Chat from "../screens/Chat";
import MyProfile from "../screens/Profile";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import StackNavigator from "./StackNavigator";

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
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchAllCategory}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Post"
        component={PostItem}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          headerShown: false,
        }}
      />
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
