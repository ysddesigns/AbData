import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import ToastNotification from "@/components/toastNotification/toast";

const Test = () => {
  const [isVisible, setIsvisible] = useState(true);
  const [testt, setTestt] = useState(false);

  const handleLogin = () => {
    setTestt(true);
    setIsvisible(true);
    console.log("button click", testt);
    console.log("button click", isVisible);
    //   setTestt(false);
    setTestt(false);
    setIsvisible(false);
  };
  return (
    <View>
      {/* Login Button */}
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
      {testt ? (
        <ToastNotification
          message="error"
          backgroundColor="red"
          visible={isVisible}
        />
      ) : (
        <ToastNotification
          message="correct"
          backgroundColor="green"
          visible={isVisible}
        />
      )}
      <View style={styles.signupRedirect}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Pressable onPress={() => router.push("/(auth)/signup")}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 66,

    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  loginButtonText: {
    color: "#fefefe",
    fontSize: 16,
    fontWeight: "600",
  },
  signupRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  signupText: {
    color: "#A9A9A9",
  },
  signupLink: {
    color: "#007AFF",
    marginLeft: 5,
    fontWeight: "600",
  },
});
