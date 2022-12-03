import React, { useEffect, useState } from "react";
import { Text, Link, HStack, Center, Heading, Switch, useColorMode, NativeBaseProvider, extendTheme, VStack, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import NativeBaseIcon from "./src/components/NativeBaseIcon";
import { Platform } from "react-native";
import { ApolloProvider } from "@apollo/client";

import StackNavigator from "./src/Navigators/StackNavigator";
import client from "./src/configs/apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./src/screens/Login";
import Onboarding from "react-native-onboarding-swiper";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem("appLaunched", "false");
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);

  // if (isFirstLaunch === null) {
  //   console.log(isFirstLaunch, "dari kondisi if");
  //   return null;
  // } else if (isFirstLaunch) {
  //   return (
  //     <ApolloProvider client={client}>
  //       <NavigationContainer>
  //         <NativeBaseProvider>
  //           <StackNavigator />
  //         </NativeBaseProvider>
  //       </NavigationContainer>
  //     </ApolloProvider>
  //   );
  // } else {
  //   return <Login />;
  // }

  return (
    firstLaunch != null && (
      <ApolloProvider client={client}>
        <NativeBaseProvider>
          <NavigationContainer>
            <StackNavigator firstLaunch={firstLaunch} />
          </NavigationContainer>
        </NativeBaseProvider>
      </ApolloProvider>
    )
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch isChecked={colorMode === "light"} onToggle={toggleColorMode} aria-label={colorMode === "light" ? "switch to dark mode" : "switch to light mode"} />
      <Text>Light</Text>
    </HStack>
  );
}
