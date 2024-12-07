import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [isEmail, setIsEmail] = useState(false); // Determine if input is email

  const handleInputChange = (value: string) => {
    setEmailOrPhone(value);
    // Simple check to see if it's an email based on the presence of '@'
    setIsEmail(value.includes("@"));
  };

  const handlePasswordReset = () => {
    if (isEmail) {
      // Handle email OTP sending logic
      Alert.alert(
        "OTP Sent",
        `An OTP has been sent to your email: ${emailOrPhone}`
      );
      // navigate to the OTP screen
    } else {
      // Handle phone OTP sending logic
      Alert.alert(
        "OTP Sent",
        `An OTP has been sent to your phone number: ${emailOrPhone}`
      );
    }
    // Add actual OTP sending logic or backend integration here
    router.push("/screen/Auth/ForgotPassword/EnterOTP");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>Forgot Password?</Text>

      {/* Instruction */}
      <Text style={styles.instructionText}>
        Enter your registered email or phone number, and we'll send you an OTP
        to reset your password.
      </Text>

      {/* Email or Phone Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name={isEmail ? "mail-outline" : "call-outline"}
          size={20}
          color="#007AFF"
        />
        <TextInput
          placeholder="Email or Phone"
          style={styles.input}
          value={emailOrPhone}
          onChangeText={handleInputChange}
          keyboardType={isEmail ? "email-address" : "phone-pad"}
        />
      </View>

      {/* Submit Button */}
      <Pressable style={styles.resetButton} onPress={handlePasswordReset}>
        <Text style={styles.resetButtonText}>Send OTP</Text>
      </Pressable>

      {/* Back to Login */}
      <View style={styles.loginRedirect}>
        <Text style={styles.loginText}>Remembered your password?</Text>
        <Pressable onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.loginLink}>Log In</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    padding: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#05161A",
    marginBottom: 20,
    textAlign: "center",
  },
  instructionText: {
    fontSize: 14,
    color: "#A9A9A9",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#EDEDED",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  resetButtonText: {
    color: "#fefefe",
    fontSize: 16,
    fontWeight: "600",
  },
  loginRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#A9A9A9",
  },
  loginLink: {
    color: "#007AFF",
    marginLeft: 5,
    fontWeight: "600",
  },
});
