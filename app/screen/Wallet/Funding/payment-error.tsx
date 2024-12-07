import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect } from "react";
import { Image, Pressable, StyleSheet } from "react-native";

const Text = ThemedText;
const View = ThemedView;

const PaymentError = () => {
  const [tx_ref, transaction_id] = useSearchParams();

  // useEffect(() => {
  //   // log the transaction details
  //   console.log("Transaction reference", tx_ref);
  //   console.log("Transaction Id: ", transaction_id);
  // }, [tx_ref, transaction_id]);
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/error.png")}
        style={styles.image}
      />
      <View style={styles.referenceContainer}>
        <Text style={styles.title}>Something whent wrong</Text>
        <Text style={styles.title}>Please try again</Text>
      </View>

      <Pressable
        onPress={() => router.replace("/screen/Wallet/Funding/AddFunds")}
        style={styles.doneButton}
      >
        <Text>Retry</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "30%",

    justifyContent: "center",
    alignContent: "center",
    padding: 16,
  },
  referenceContainer: {
    marginLeft: 17,
    margin: 12,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
  },
  redirectToHome: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "blue",
  },

  title: {
    textAlign: "center",
  },
  doneButton: {
    alignItems: "center",
    borderRadius: 12,
    margin: 12,
    backgroundColor: "orange",
    padding: 12,
  },
});

export default PaymentError;
