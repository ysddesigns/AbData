import React, { useState } from "react";
import {
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ToastNotification from "@/components/toastNotification/Toastt";

const Text = ThemedText;
const View = ThemedView;

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    backgroundColor: "#f00",
  });

  const [Error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const showToast = (message: string, backgroundColor: string) => {
    setToast({ visible: true, message, backgroundColor });
    setTimeout(() => setToast({ ...toast, visible: false }), 3500);
  };

  const handleLogin = () => {
    // Logic for handling login (API call)
    console.log("button click");

    if (!emailOrPhone || !password) {
      // Alert.alert(
      //   "Missing Fields",
      //   "Please enter both email/phone and password."
      // );
      showToast("Please enter both email/phone and password", "red");
      return;
    }

    setIsLoading(true);
    // Placeholder for successful login
    try {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, emailOrPhone, password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          // successful login
          showToast("login successful", "#4CAF50");
          console.log("login successful", user);
          // store token in asyncstorage
          await AsyncStorage.setItem("userToken", user.uid);
          router.replace("/(tabs)/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error code", errorCode);
          console.log("error message:", errorMessage);

          if (error.code === "auth/user-not-found") {
            showToast("No account found with this email.", "#f00");
          } else if (error.code === "auth/wrong-password") {
            showToast("Incorrect password. Please try again.", "#f00");
          } else {
            showToast("Something went wrong. Please try again.", "#f00");
          }
        });
      // Navigate to the home screen or the main application flow
      console.log({ emailOrPhone, password });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>Login</Text>

      {/* Email or Phone Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#007AFF" />
        <TextInput
          placeholder="Email or Phone"
          style={styles.input}
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#007AFF" />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#007AFF"
          />
        </Pressable>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity
        onPress={() =>
          router.push("/screen/Auth/ForgotPassword/forgotpassword")
        }
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, isLoading && styles.isdisableButton]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Sign Up Redirect */}
      <View style={styles.signupRedirect}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    // marginTop: 100,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    padding: 5,
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
  forgotPasswordText: {
    textAlign: "right",
    color: "#007AFF",
    marginVertical: 10,
    fontSize: 14,
  },
  loginButton: {
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
  disabledButton: {
    backgroundColor: "#A9A9A9",
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
