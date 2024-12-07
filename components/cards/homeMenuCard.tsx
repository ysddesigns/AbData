import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface homeCardProps {
  itemName: string;
  iconName: string;
  color: string;
  cardTextStyle: object;
  onpress: () => void;
}
const HomeMenuCard: React.FC<homeCardProps> = ({
  itemName,
  color,
  cardTextStyle,
  iconName,
  onpress,
}) => {
  return (
    <TouchableOpacity style={[styles.card, color]} onPress={onpress}>
      <Ionicons
        name={iconName}
        size={20}
        color={color}
        style={{ alignSelf: "center" }}
      />
      <Text style={[styles.cardText, cardTextStyle]}>{itemName}</Text>
    </TouchableOpacity>
  );
};

export default HomeMenuCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#C1E8FF",
    padding: 5,
    borderRadius: 7,
    margin: 1,
    width: "27%",
  },
  cardText: {
    textAlign: "center",
  },
});
