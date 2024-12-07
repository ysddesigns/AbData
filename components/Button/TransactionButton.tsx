import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface ButtonProps {
  buttonName: string;
  iconName: any;
  onpress: () => void;
}
const TransactionButton: React.FC<ButtonProps> = ({
  buttonName,
  iconName,
  onpress,
}) => {
  return (
    <Pressable style={styles.container} onPress={onpress}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={iconName}
          size={20}
          color={"blue"}
          style={styles.icon}
        />
      </View>
      <Text style={styles.buttonText}>{buttonName}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#fefefe",
    padding: 15,
    borderRadius: 25,
  },
  icon: {},
  buttonText: {
    color: "#fefefe",
  },
});
export default TransactionButton;
