import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface ButtonProps {
  buttonName: string;
  iconName: any;
  size: number;
  color: string;
  onpress?: () => void;
}

const HomeCardItem: React.FC<ButtonProps> = ({
  buttonName,
  iconName,
  size,
  color,
  onpress,
}) => {
  return (
    <Pressable onPress={onpress} style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={iconName} size={size} color={"#fefefe"} />
      </View>
      <Text style={styles.buttonText}>{buttonName}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 10,
  },
  iconContainer: {
    backgroundColor: "#0A2E36", // Dark background for icons similar to the transaction list style
    padding: 15,
    borderRadius: 50,
    elevation: 5, // Adding shadow for better visual effect
  },
  buttonText: {
    color: "#fefefe", // White text like in the transaction list
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default HomeCardItem;
