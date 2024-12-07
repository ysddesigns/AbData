import { StatusBar, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import TransactionHistory from "../screen/Transactions/TransactionHome";

const Transaction = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TransactionHistory />
    </SafeAreaView>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {},
  individualContainer: {
    backgroundColor: "#fefefe",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 3,
    padding: 5,
  },
  transactionConditionCText: {
    color: "green",
    fontStyle: "italic",
  },
  listHeaderText: {
    fontSize: 20,
  },
});
