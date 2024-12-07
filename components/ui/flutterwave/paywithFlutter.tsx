import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

import { PayWithFlutterwave } from "flutterwave-react-native";
import { router } from "expo-router";
// or import PayWithFlutterwave from 'flutterwave-react-native';

interface RedirectParams {
  status: "successful" | "cancelled";
  transaction_id?: string;
  tx_ref: string;
}

interface PaywithFlutterProps {
  text: string;
}

const PaywithFlutter: React.FC = () => {
  const [text, setText] = useState("");
  /* An example function called when transaction is completed successfully or canceled */
  const handleOnRedirect = async (data: RedirectParams) => {
    try {
      console.log("Payment Data:", data);

      if (data.status === "successful") {
        // Navigate to success page
        router.push({
          pathname: "/screen/pages/payment-success",
          params: { tx_ref: data.tx_ref, transaction_id: data.transaction_id },
        });
      } else if (data.status === "cancelled") {
        // Navigate to cancellation page
        router.push("/screen/pages/payment-cancell");
      } else {
        console.error("Unexpected payment status:", data.status);
        router.push({
          pathname: "/screen/pages/payment-error",
          params: { errorMessage: `Unexpected status: ${data.status}` },
        });
      }
    } catch (error) {
      // Log and handle any unexpected errors
      console.error("Error handling payment redirection:", error);
      router.push("/screen/pages/payment-error");
      // Optionally redirect to an error page
    }
  };

  /* An example function to generate a random transaction reference */
  const generateTransactionRef = (length: number) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result);
    return `flw_tx_ref_${result}`;
  };

  return (
    <View>
      <Text>Amount</Text>
      <TextInput
        placeholder="Amount"
        // placeholderTextColor={}
        style={styles.button}
      />
      <PayWithFlutterwave
        onRedirect={handleOnRedirect}
        options={{
          tx_ref: generateTransactionRef(10),
          authorization: "FLWPUBK_TEST-eacc9b3006a5621ce9765c1de816249b-X",
          customer: {
            email: "yusufbyusufgwarmai@gmail.com",
          },
          amount: 2000,
          currency: "NGN",
          payment_options: "card",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
});
export default PaywithFlutter;
