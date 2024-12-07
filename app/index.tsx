import { ActivityIndicator, Text, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { text } from "stream/consumers";

const RootApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setIsLoggedIn(!!token); //check if the token exist
      } catch (error) {
        console.log("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    if (isLoggedIn === null) return; //wait until the state is determined
    router.replace(isLoggedIn ? "/(tabs)/home" : "/(auth)/login");
  }, [isLoggedIn]); //dependency array if logging status change it will change the useEffect logic to othrwise

  // Show loading spinner while checking login status
  if (isLoggedIn == null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  //   return null; //this component will only handle routing
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to AbData</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#05161A",
  },
  text: {
    fontSize: 50,
  },
});

export default RootApp;
