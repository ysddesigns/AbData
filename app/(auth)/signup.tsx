import React, { useState } from "react";
import {
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/firebaseconfig";
import { addUser } from "@/backend/firebase/firebaseCRUD";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const Text = ThemedText;
const View = ThemedView;

const Signup = () => {
  // const [user, setIslogged] = useContext() predefine
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Error, setError] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    //  validation and sign-up logic here
    if (!fullName || !email || !phone || !password) {
      Alert.alert("Error", "Please fill in all fileds");
      return;
    }
    console.log("isLoading before API call", isLoading);

    setIsLoading(true);
    console.log(isLoading);

    console.log("isLoading after setting true API call", isLoading);

    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          // save uid to asynstorage
          await AsyncStorage.setItem("userToken", user.uid);
          // upload user fullname, email and phone number to database
          addUser(user.uid, fullName, phone, email);
          console.log(fullName, phone, email);

          router.replace("/(tabs)/home");
          console.log("user created successfully:", user.uid);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode); //store error code to error

          console.log("error code:", errorCode);
          console.log("error message:", errorMessage);
          switch (error) {
            case "auth/email-already-in-use":
              setError("email already in use");
              break;
            case "auth/invalid-email":
              setError("invalid email");
              break;
          }
        });
    } catch (error) {
      console.log("Error creating user {smart}: ", error);
    } finally {
      setIsLoading(false);
    }

    // using mongoDB
    // try {
    //   const response = await axios.post("http://172.20.10.3:5000", {
    //     fullName,
    //     email,
    //     phone,
    //     password,
    //   });
    //   console.log("button clicked");
    //   console.log("User created:", response.data);
    //   router.replace("/(tabs)");
    // } catch (error) {
    //   console.error("Signup error:", error); // Log the error for debugging
    //   Alert.alert(
    //     "Error",
    //     error.response?.data?.message || "Something went wrong"
    //   );
    // }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>Sign Up</Text>

      {/* Full Name Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#007AFF" />
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      <Text>{Error}</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#007AFF" />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Phone Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={20} color="#007AFF" />
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
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

      {/* Sign Up Button */}
      <TouchableOpacity
        style={[
          styles.signupButton,
          isLoading && { backgroundColor: "#9A9A9" },
        ]}
        onPress={handleSignup}
        disabled={isLoading} //prevent multple clicks
      >
        {isLoading ? (
          <ActivityIndicator size={20} color={"red"} />
        ) : (
          <Text style={styles.signupButtonText}>Create Account</Text>
        )}
      </TouchableOpacity>

      {/* Login Redirect */}
      <View style={styles.loginRedirect}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <Pressable onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.loginLink}>Log in</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
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
  // signupButton: {
  //   backgroundColor: "#007AFF",
  //   paddingVertical: 15,
  //   borderRadius: 8,
  //   alignItems: "center",
  //   marginVertical: 20,
  //   flexDirection: "row",
  //   justifyContent: "center",
  // },
  signupButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    height: 50,
  },

  signupButtonText: {
    color: "#fefefe",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 12,
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
