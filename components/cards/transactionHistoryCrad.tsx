import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const TransactionHistoryCrad = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/react-logo.png")}
        resizeMethod="resize"
        style={styles.transactionImage}
      />
      <View>
        <View style={styles.containerDetails}>
          <Text>
            Transfer from <Text style={{ fontWeight: "bold" }}>ABBANSU</Text>
          </Text>
          <Text style={{ fontWeight: "bold" }}> +N1,000.00</Text>
        </View>
        <View style={styles.containerDetails}>
          <Text>Oct 1st, 2024</Text>
          <Text style={{ color: "green", elevation: 9, shadowColor: "green" }}>
            successful
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionHistoryCrad;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#C1E8FF",
  },
  containerDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    position: "relative",
  },
  transactionImage: {
    width: 45,
    height: 45,
  },
});
