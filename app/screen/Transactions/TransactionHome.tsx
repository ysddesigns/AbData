import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const transactionData = [
  {
    id: 1,
    transactionType: "Transfer to",
    amount: 5000,
    status: "Successful",
    date: "2024-10-12",
    recipient: "John Doe",
  },
  {
    id: 2,
    transactionType: "Withdraw",
    amount: 2000,
    status: "Failed",
    date: "2024-10-11",
  },
  {
    id: 3,
    transactionType: "Buy Data/Airtime",
    amount: 1000,
    status: "Refund",
    date: "2024-10-10",
    provider: "MTN",
  },
  {
    id: 4,
    transactionType: "Utility bills",
    amount: 3500,
    status: "Successful",
    date: "2024-10-09",
    provider: "Kano Electricity",
  },
  {
    id: 5,
    transactionType: "Transfer to",
    amount: 15000,
    status: "Failed",
    date: "2024-10-08",
    recipient: "Jane Smith",
  },
  {
    id: 6,
    transactionType: "Buy Data/Airtime",
    amount: 500,
    status: "Successful",
    date: "2024-10-07",
    provider: "Airtel",
  },
  {
    id: 7,
    transactionType: "Withdraw",
    amount: 3000,
    status: "Refund",
    date: "2024-10-06",
  },
];

const TransactionHistory: React.FC = () => {
  // Render each transaction item
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        {/* Show different icons based on transaction type */}
        {item.transactionType === "Transfer to" && (
          <Ionicons name="swap-horizontal" size={24} color="white" />
        )}
        {item.transactionType === "Withdraw" && (
          <Ionicons name="download" size={24} color="white" />
        )}
        {item.transactionType === "Buy Data/Airtime" && (
          <Ionicons name="phone-portrait" size={24} color="white" />
        )}
        {item.transactionType === "Utility bills" && (
          <Ionicons name="home" size={24} color="white" />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {item.transactionType} {item.recipient ? `to ${item.recipient}` : ""}
        </Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.amountText}>₦{item.amount.toLocaleString()}</Text>
        <Text
          style={[
            styles.statusText,
            item.status === "Successful" ? styles.success : styles.failed,
          ]}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={transactionData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05161A",
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0A2E36",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  text: {
    color: "#fefefe",
    fontSize: 16,
    fontWeight: "500",
  },
  dateText: {
    color: "#A9A9A9",
    fontSize: 12,
  },
  amountText: {
    color: "#fefefe",
    fontSize: 16,
    fontWeight: "600",
  },
  statusText: {
    fontSize: 14,
    marginTop: 5,
  },
  success: {
    color: "green",
  },
  failed: {
    color: "red",
  },
});

export default TransactionHistory;
