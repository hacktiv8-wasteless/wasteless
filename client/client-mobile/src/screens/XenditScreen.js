import { WebView } from "react-native-webview";
import { SafeAreaView, View, Text } from "react-native";
import { Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { TopUp } from "../query/TopUp";
import { useEffect } from "react";
import { GET_INVOICE } from "../query/Transaction";

export default function XenditPayment({ route, navigation: { navigate } }) {
  const { paymentData, balanceInput } = route.params;

  const [
    invoice,
    { data: invoiceData, loading: invoiceLoading, error: invoiceError },
  ] = useMutation(GET_INVOICE);

  const handleTopUp = async () => {
    const paid = "PAID";
    try {
      let invoicePayload = {
        external_id: paymentData?.createInvoice?.external_id,
        status: paid,
        totalPrice: balanceInput,
      };
      await invoice({
        variables: {
          invoicePayload,
        },
      });
    } catch (errors) {
      console.log(invoiceError, "wkwkwkwk");
      console.log(errors, "<<<<<<<<");
    }
  };

  useEffect(() => {
    if (invoiceData?.payInvoice?.message === "Topup Success!")
      navigate("MyProfile");
    console.log(invoiceData, "<<<>>><<>>");
  }, [invoiceData]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: `${paymentData?.createInvoice?.invoice_url}`,
        }}
      />

      <Button onPress={() => handleTopUp()}>Top Up Now</Button>
    </SafeAreaView>
  );
}
