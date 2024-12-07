import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { fetchBillCategories, payBill } from "../flwconfig";

const BillsPayment = () => {
  const [categories, setCategories] = useState([]);
  const [selectedBill, setSelectedBill] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchBillCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error loading bill categories:", error);
        Alert.alert(
          "Error",
          "Failed to load bill categories. Try again later."
        );
      }
    };
    loadCategories();
  }, []);

  const handlePayment = async () => {
    if (!selectedBill) {
      Alert.alert("Validation Error", "Please select a bill category.");
      return;
    }
    if (!phone) {
      Alert.alert("Validation Error", "Please enter a phone number.");
      return;
    }
    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert("Validation Error", "Please enter a valid amount.");
      return;
    }

    try {
      const result = await payBill(phone, selectedBill, parseFloat(amount));
      console.log("Payment successful:", result);
      Alert.alert("Success", "Payment successful!");
    } catch (error) {
      console.error("Payment failed:", error);
      Alert.alert("Error", "Payment failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bills Payment</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()} // Ensure id is a string
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              item.biller_code === selectedBill && styles.selectedCategory,
            ]}
            onPress={() => setSelectedBill(item.biller_code)}
          >
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    padding: 10,
  },
  categoryItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  selectedCategory: {
    backgroundColor: "#6200ea",
  },
  categoryText: {
    color: "#333",
    fontWeight: "bold",
  },
});

export default BillsPayment;
