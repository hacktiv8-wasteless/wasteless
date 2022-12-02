import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, FormControl, Icon, Input, Pressable, Stack, WarningOutlineIcon, Button, Center, Heading, VStack, Link, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation } from "@apollo/client";
import { POST_REGISTER, POST_LOGIN } from "../query/Users";
import AsyncStorage from "@react-native-async-storage/async-storage";
// -------------------------------------------------------------------

export default function FormUser({ page, navigation }) {
  const [show, setShow] = React.useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleEmailChange = (val) => setEmail(val);
  const handlePasswordChange = (val) => setPassword(val);
  const handleUsernameChange = (val) => setUsername(val);
  const handlePhoneNumberChange = (val) => setPhoneNumber(val);
  const handleAddressChange = (val) => setAddress(val);

  const [register, { data, loading, error }] = useMutation(POST_REGISTER);
  const [login, { data: loginData, loginLoading, loginError }] = useMutation(POST_LOGIN);

  if (loading || loginLoading) return <Text>Loading....</Text>;
  if (error || loginError) return <Text>Error: {error}</Text>;

  const handleSubmitLogin = async () => {
    const userPayload = {
      email,
      password,
    };
    // console.log(userPayload);
    await login({
      variables: { userPayload },
    });
    // console.log(loginData, "<<<<<<");
    const access_token = loginData?.loginUser?.access_token;
    // console.log(access_token);
    await AsyncStorage.setItem("access_token", access_token);
    //! pindah ke helpers ntar
    navigation.navigate("Home");
    //! navigate ke halaman home
    // setEmail("");
    // setPassword("");
  };

  const handleSubmitRegister = async () => {
    const userPayload = {
      email,
      password,
      username,
      phoneNumber,
      address,
    };
    await register({
      variables: { userPayload },
    });
    console.log(data);
    //! navigate ke halaman login atau langsung ke home (kalo ada access_token)
    // console.log(userPayload);
    setEmail("");
    setPassword("");
    setUsername("");
    setPhoneNumber("");
    setAddress("");
  };

  const handlerShowPassword = () => {
    show ? setShow(false) : setShow(true);
  };

  return (
    <>
      {/* Login Form */}
      {page === "Login" && (
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading>Welcome</Heading>
            <Heading>Sign in to continue!</Heading>
            <Input type="email" placeholder="email" onChangeText={handleEmailChange} value={email} />
            <Input type="password" placeholder="password" onChangeText={handlePasswordChange} value={password} />
            <Button mt="2" colorScheme="indigo" onPress={handleSubmitLogin}>
              Sign in
            </Button>
          </Box>
          <Stack>
            <Button onPress={() => navigation.navigate("Register")}>ke register</Button>
          </Stack>
        </Center>
      )}

      {/* Register Form */}
      {page === "Register" && (
        <Center w="100%">
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading>Welcome</Heading>
            <Heading>Sign in to continue!</Heading>
            <Input type="text" placeholder="username" onChangeText={handleUsernameChange} value={username} />
            <Input type="email" placeholder="email" onChangeText={handleEmailChange} value={email} />
            <Input
              type={show ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={handlerShowPassword}>
                  <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="3" color="muted.400" />
                </Pressable>
              }
              placeholder="Password"
              onChangeText={handlePasswordChange}
              value={password}
            />
            <Input type="phoneNumber" placeholder="text" onChangeText={handlePhoneNumberChange} value={phoneNumber} />
            <Input type="address" placeholder="text" onChangeText={handleAddressChange} value={address} />
            <Button mt="2" colorScheme="indigo" onPress={handleSubmitRegister}>
              Sign up
            </Button>
          </Box>
          <Stack>
            <Button onPress={() => navigation.navigate("Login")}>ke login</Button>
          </Stack>
          <Stack>
            <Button onPress={() => navigation.navigate("Login")}>ke login</Button>
          </Stack>
        </Center>
      )}
    </>
  );
}
