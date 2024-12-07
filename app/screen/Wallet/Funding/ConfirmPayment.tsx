import { StyleSheet } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const Text = ThemedText;
const View = ThemedView;
const ConfirmPayment = () => {
  return (
    <View>
      <Text>ConfirmPayment</Text>
    </View>
  );
};

export default ConfirmPayment;

const styles = StyleSheet.create({});
