import {
  Text,
  Center,
  Box,
  Heading,
  VStack,
  HStack,
  FormControl,
  Link,
  Input,
  Button,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { TouchableRipple } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { POST_INVOICE } from "../query/Transaction";
import { useEffect } from "react";
import { useState } from "react";

const Payment = ({ navigation: { navigate } }) => {
  // const navigation = useNavigation();
  const [
    payment,
    { data: paymentData, loading: paymentLoading, error: paymentError },
  ] = useMutation(POST_INVOICE);

  const [balanceInput, setBalanceInput] = useState(0);
  const handleBalance = (val) => setBalanceInput(val);

  const handleSubmit = async () => {
    try {
      await payment({ variables: { balance: +balanceInput } });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (paymentData) navigate("Xendit", { paymentData, balanceInput });
    console.log(paymentData);
  }, [paymentData]);

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Your Wallet
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Top up Your Wallet here!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Amount</FormControl.Label>
            <Input
              onChangeText={handleBalance}
              value={balanceInput}
              type="number"
              placeholder="Enter your Amount here"
            />
          </FormControl>

          <Button mt="2" colorScheme="green" onPress={() => handleSubmit()}>
            Submit
          </Button>
          <HStack mt="6" justifyContent="center"></HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Payment;
