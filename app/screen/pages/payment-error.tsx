import { StyleSheet, Text, View } from "react-native";

const PaymentError = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong!</Text>
      <Text>Please try again or contact support if the issue persists.</Text>
    </View>
  );
};

export default PaymentError;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
