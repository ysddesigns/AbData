import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";

const OtpScreen = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // To store each digit of the OTP

  const handleOtpChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };

  const handleSubmitOtp = () => {
    const enteredOtp = otp.join(""); // Combine the digits to form the complete OTP
    if (enteredOtp.length === 4) {
      // Verify OTP logic (Replace this with actual backend verification)

      // alerting the user for better user experience
      Alert.alert("OTP Verified", "You have successfully verified your OTP.");

      // navigate to password reset page after successfully validating the OTP
      router.replace("/screen/Auth/ForgotPassword/ResetPassword");
    } else {
      Alert.alert("Invalid OTP", "Please enter a valid 4-digit OTP.");
    }
    console.log(otp);
  };

  const handleResendOtp = () => {
    // Logic to resend OTP (e.g., calling API to send OTP)
    Alert.alert("OTP Sent", "A new OTP has been sent to your email or phone.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Enter OTP</Text>

      <Text style={styles.instructionText}>
        We have sent a 4-digit OTP to your registered email or phone number.
      </Text>

      {/* OTP Input Fields */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
          />
        ))}
      </View>

      {/* Submit Button */}
      <Pressable style={styles.submitButton} onPress={handleSubmitOtp}>
        <Text style={styles.submitButtonText}>Verify OTP</Text>
      </Pressable>

      {/* Resend OTP */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive the OTP?</Text>
        <Pressable onPress={handleResendOtp}>
          <Text style={styles.resendLink}>Resend OTP</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OtpScreen;

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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  otpInput: {
    borderColor: "#EDEDED",
    borderWidth: 1,
    borderRadius: 8,
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 18,
    color: "#05161A",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  submitButtonText: {
    color: "#fefefe",
    fontSize: 16,
    fontWeight: "600",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  resendText: {
    color: "#A9A9A9",
  },
  resendLink: {
    color: "#007AFF",
    marginLeft: 5,
    fontWeight: "600",
  },
});
