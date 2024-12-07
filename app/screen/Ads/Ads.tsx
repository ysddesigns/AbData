import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Ads = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is where ads going to display </Text>
      <Text style={styles.text}>Like Googogle Admob </Text>
      <Text style={styles.text}>Or any other advertisement </Text>
      <Text style={styles.text}>And In app update information </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#05161A",
    padding: 7,
    margin: 3,
  },
  text: {
    color: "#fefefe",
  },
});
export default Ads;
