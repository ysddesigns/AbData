import { useWallet } from "@/context/waletContext";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { TextInput, Pressable, StyleSheet } from "react-native";
import { PayWithFlutterwave } from "flutterwave-react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const Text = ThemedText;
const View = ThemedView;
interface RedirectParams {
  status: "successful" | "cancelled";
  transaction_id?: string;
  tx_ref: string;
}

const PayWithFlutter: React.FC = () => {
  const { walletBalance, setWalletBalance } = useWallet();
  const [amount, setAmount] = useState("");
  const [transactionRef, setTransactionRef] = useState<string>("");

  // Generate a stable transaction reference when the component mounts
  const generateTransactionRef = (length: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return `flw_tx_ref_${result}`;
  };
  useEffect(() => {
    setTransactionRef(generateTransactionRef(10));
  }, []);

  /* An example function called when transaction is completed successfully or canceled */
  /* Handle redirection after payment */
  const handleOnRedirect = async (data: RedirectParams) => {
    if (!amount) {
      console.log("no amount");
    }
    try {
      console.log("Payment Data:", data);
      if (data.status === "successful") {
        const parsedAmount = parseFloat(amount);

        if (!isNaN(parsedAmount)) {
          const newBalance = walletBalance + parsedAmount;
          setWalletBalance(newBalance);
        }

        // Navigate to success page
        router.push({
          pathname: "/screen/Wallet/Funding/PaymentSuccess",
          params: {
            tx_ref: data.tx_ref,
            transaction_id: data.transaction_id,
          },
        });
      } else if (data.status === "cancelled") {
        // Navigate to cancellation page
        router.push("/screen/Wallet/Funding/PaymentSuccess");
      } else {
        console.error("Unexpected payment status:", data.status);
        router.push({
          pathname: "/screen/Wallet/Funding/payment-error",
          params: { errorMessage: `Unexpected status: ${data.status}` },
        });
      }
    } catch (error) {
      console.error("Error handling payment redirection:", error);
      router.push("/screen/Wallet/Funding/payment-error");
    }
  };

  return (
    <View>
      <Text>Amount</Text>
      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={(value) => setAmount(value)} //update state on input change
        // placeholderTextColor={"white"}
        style={styles.input}
        autoFocus
        selectionColor={"white"}
      />
      <View style={styles.staticAmountContainer}>
        <Pressable style={styles.staticAmount} onPress={() => setAmount("500")}>
          <Text style={styles.staticAmountText}>₦500</Text>
        </Pressable>
        <Pressable
          style={styles.staticAmount}
          onPress={() => setAmount("1000")}
        >
          <Text style={styles.staticAmountText}>₦1000</Text>
        </Pressable>
        <Pressable
          style={styles.staticAmount}
          onPress={() => setAmount("2000")}
        >
          <Text style={styles.staticAmountText}>₦2000</Text>
        </Pressable>
        <Pressable
          style={styles.staticAmount}
          onPress={() => setAmount("5000")}
        >
          <Text style={styles.staticAmountText}>₦5000</Text>
        </Pressable>
        <Pressable
          style={styles.staticAmount}
          onPress={() => setAmount("10000")}
        >
          <Text style={styles.staticAmountText}>₦10000</Text>
        </Pressable>
      </View>
      {/* Display the selected amount */}
      <View style={styles.amountDisplay}>
        <Text style={styles.amountDisplayText}>Deposit ₦{amount}</Text>
      </View>
      {/* Pay with fluttterwave button */}
      <PayWithFlutterwave
        onRedirect={handleOnRedirect}
        options={{
          tx_ref: transactionRef,
          authorization: "FLWPUBK_TEST-6528752deb191a90f99945abddfd6166-X", //public key
          customer: {
            email: "yusufbyusufgwarmai@gmail.com",
          },
          amount: Number(amount) || 0,
          currency: "NGN",
          payment_options: "card",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    margin: 17,
    color: "white",
  },
  staticAmountContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  staticAmount: {
    borderRadius: 7,
    borderColor: "gray",
    borderWidth: 1,
    padding: 9,
    margin: 7,
  },
  amountDisplay: {
    marginBottom: 5,
    margin: 5,
  },
  amountDisplayText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "#0A2E36",
    padding: 7,
    width: "70%",
    alignSelf: "center",
    borderRadius: 5,
    margin: 12,
  },
  staticAmountText: {
    // color: "white",
  },
});

export default PayWithFlutter;
