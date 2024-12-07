import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect } from "react";
import { Image, Pressable, StyleSheet } from "react-native";

const Text = ThemedText;
const View = ThemedView;

const PaymentSuccess = () => {
  const [tx_ref, transaction_id] = useSearchParams();

  useEffect(() => {
    // log the transaction details
    console.log("Transaction reference", tx_ref);
    console.log("Transaction Id: ", transaction_id);
  }, [tx_ref, transaction_id]);
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/done.png")}
        style={styles.image}
      />
      <View style={styles.referenceContainer}>
        <Text style={styles.title}>Payment Successful!</Text>
        <Text>
          Txn Reference:
          <Text style={styles.reference}>{tx_ref}</Text>
        </Text>
        <Text>Transaction ID: {transaction_id}</Text>
      </View>

      <Pressable
        onPress={() => router.replace("/(tabs)/home")}
        style={styles.doneButton}
      >
        <Text style={styles.buttonText}>Done</Text>
      </Pressable>
      <Pressable
        onPress={() => router.replace("/(tabs)/home")}
        style={styles.doneButton}
      >
        <Text style={styles.buttonText}>Share</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
  reference: {
    fontWeight: "bold",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "green",
  },
  doneButton: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    margin: 12,
    backgroundColor: "green",
    padding: 12,
  },
  buttonText: {
    color: "#fefefe",
  },
});

export default PaymentSuccess;
