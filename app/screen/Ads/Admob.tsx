import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Admob = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Get rewarded for inviting users! </Text>
      <Text style={styles.text}>
        Refer friends to AbData and earn referral bonuses{" "}
      </Text>
      <Text style={styles.text}>Or any other advertisement </Text>
      <Text style={styles.text}>And In app update information </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "brown",
    padding: 7,
    margin: 3,
  },
  text: {
    color: "#fefefe",
    left: 12,
  },
  textHeader: {
    color: "#fefefe",
    fontSize: 15,
    left: 12,
  },
});
export default Admob;
