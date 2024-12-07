import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

interface btnProps {
  name: string;
  onclick: () => void;
}
const FundwalletBtn: React.FC<btnProps> = ({ name, onclick }) => {
  return (
    <Pressable onPress={onclick} style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
};

export default FundwalletBtn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    padding: 7,
    margin: 7,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
