import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { fetchUser } from "@/backend/firebase/firebaseCRUD";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastNotification from "@/components/toastNotification/Toastt";

const HomeHeader = () => {
  const [userData, setUserData] = useState<any>(null);
  const [Error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // fetch user from firestore
  useEffect(() => {
    const getUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("userToken");
        if (userId) {
          const data = await fetchUser(userId);
          setUserData(data);
          console.log("user data from home header:", userData);
        } else {
          console.log("No user id Found in AsyncStorage from Home page:");
          setError("please login to ypur account");
        }
      } catch (error) {
        console.log("Error fetching user data");
        setError("something went wrong");
      }
    };
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      {Error ? (
        <ToastNotification message={Error} visible backgroundColor="red" />
      ) : null}
      <View
        style={{
          flexDirection: "row",
          marginLeft: 5,
          alignItems: "center",
          marginRight: 5,
        }}
      >
        <Image
          source={require("@/assets/images/smart.png")}
          style={styles.userProfilePicture}
          // resizeMode="contain"
        />
        <Text style={{ marginLeft: 5, color: "white" }}>
          Hi, {userData?.fullname}
        </Text>
      </View>

      <Ionicons name="notifications-circle" size={40} color={"white"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#05161A",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 9,
    margin: 3,
    borderRadius: 9,
  },
  userProfilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
export default HomeHeader;
