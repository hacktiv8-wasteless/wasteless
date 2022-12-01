import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Box, FormControl, Icon, Input, Pressable, Stack, WarningOutlineIcon, Button, Center, Heading, VStack, Link, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

//! React hook form
// import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
// -------------------------------------------------------------------

export default function FormUser({ page }) {
  const [show, setShow] = React.useState(false);

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const handleEmailChange = (val) => {
    setFormLogin({
      ...formLogin,
      email: val,
    });
  };

  const handlePasswordChange = (val) => {
    setFormLogin({
      ...formLogin,
      password: val,
    });
  };

  const handleSubmitLogin = () => {
    console.log(formLogin);
  };

  const handlerShowPassword = () => {
    show ? setShow(false) : setShow(true);
  };

  //! React hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <>
      {/* Login Form */}
      {page === "Login" && (
        <>
          <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Input type="email" placeholder="email" onChangeText={handleEmailChange} />
              <Input type="password" placeholder="password" onChangeText={handlePasswordChange} />
              <Button mt="2" colorScheme="indigo" onPress={handleSubmitLogin}>
                Sign in
              </Button>
              <Heading>Welcome</Heading>
              <Heading>Sign in to continue!</Heading>
              <VStack space={3} mt="5">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormControl>
                      <FormControl.Label>Email</FormControl.Label>
                      <Input type="email" placeholder="Email" onChangeText={onChange} onBlur={onBlur} value={value} />
                    </FormControl>
                  )}
                  name="email"
                />
                {errors.email && <Text>This is required.</Text>}
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    maxLength: 100,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormControl>
                      <FormControl.Label>Password</FormControl.Label>
                      <Input
                        type={show ? "text" : "password"}
                        InputRightElement={
                          <Pressable onPress={handlerShowPassword}>
                            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                          </Pressable>
                        }
                        placeholder="Password"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Atleast 6 characters are required.</FormControl.ErrorMessage>
                    </FormControl>
                  )}
                  name="password"
                />
                <Button mt="2" colorScheme="indigo" onPress={handleSubmit(onSubmit)}>
                  Sign in
                </Button>
                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    I'm a new user.{" "}
                  </Text>
                  <Link
                    _text={{
                      color: "indigo.500",
                      fontWeight: "medium",
                      fontSize: "sm",
                    }}
                    href="#"
                  >
                    Sign Up
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </>
      )}

      {/* Register Form */}
      {page === "Register" && (
        <Center w="100%">
          <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading
              size="lg"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              fontWeight="semibold"
            >
              Welcome
            </Heading>
            <Heading
              mt="1"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="medium"
              size="xs"
            >
              Sign up to continue!
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" />
              </FormControl>
              <FormControl>
                <FormControl.Label>Confirm Password</FormControl.Label>
                <Input type="password" />
              </FormControl>
              <Button mt="2" colorScheme="indigo">
                Sign up
              </Button>
            </VStack>
          </Box>
        </Center>
      )}
    </>
    //! Test react-hook-form
    // <Center>
    //   <Controller
    //     control={control}
    //     rules={{
    //       required: true,
    //     }}
    //     render={({ field: { onChange, onBlur, value } }) => (
    //       <FormControl>
    //         <FormControl.Label>Email</FormControl.Label>
    //         <Input type="email" placeholder="Email" onChangeText={onChange} onBlur={onBlur} value={value} />
    //       </FormControl>
    //     )}
    //     name="email"
    //   />
    //   {errors.email && <Text>This is required.</Text>}

    //   <Controller
    //     control={control}
    //     rules={{
    //       maxLength: 100,
    //     }}
    //     render={({ field: { onChange, onBlur, value } }) => (
    //       <FormControl>
    //         <FormControl.Label>Password</FormControl.Label>
    //         <Input
    //           type={show ? "text" : "password"}
    //           InputRightElement={
    //             <Pressable onPress={handlerShowPassword}>
    //               <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
    //             </Pressable>
    //           }
    //           placeholder="Password"
    //           onChangeText={onChange}
    //           onBlur={onBlur}
    //           value={value}
    //         />
    //         <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Atleast 6 characters are required.</FormControl.ErrorMessage>
    //       </FormControl>
    //     )}
    //     name="password"
    //   />

    //   <Button mt="2" colorScheme="indigo" onPress={handleSubmit(onSubmit)}>
    //     Sign in
    //   </Button>
    // </Center>
  );
}

// const styles = StyleSheet.create({});

{
  /* <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} />; */
}

{
  /* <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value} /> */
}
