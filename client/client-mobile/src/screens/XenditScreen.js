import { WebView } from "react-native-webview";
import { SafeAreaView, View, Text } from "react-native";
import { Button } from "native-base";

import { useMutation } from "@apollo/client";
import { TopUp } from "../query/TopUp";

export default function XenditPayment({ navigation, route }) {
  //   const { token, invoiceId } = route.params;

  //   const [createInvoice, { loading, error, data }] = useMutation(TopUp);

  //   const uri = `https://checkout-staging.xendit.co/web/638edd5c1cea5504be4d2826`;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: "https://checkout-staging.xendit.co/web/638edd5c1cea5504be4d2826",
        }}
      />
      <Button onPress={() => console.log("hello world")}>Pay Now</Button>
    </SafeAreaView>
  );
}
