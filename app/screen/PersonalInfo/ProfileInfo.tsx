import { Image, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseconfig";
import { useWallet } from "@/context/waletContext";
import { useEffect, useState } from "react";
import { fetchUser } from "@/backend/firebase/firebaseCRUD";
import { ThemedText } from "@/components/ThemedText";

const Text = ThemedText;

const Profile = () => {
  const { walletBalance } = useWallet();
  const [userData, setUserData] = useState<any>(null);

  // fetch user from firestore
  useEffect(() => {
    const getUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("userToken");
        if (userId) {
          const data = await fetchUser(userId);
          setUserData(data);
        } else {
          console.log("No user id Found in AsyncStorage from profile page:");
        }
      } catch (error) {
        console.log("Error fetching user data");
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userToken");
      console.log("user logout!");

      router.replace("/(auth)/login");
    } catch (error) {
      console.log("error logginOut user", error);
    }
  };
  return (
    <View style={styles.container}>
      {/* Header with Settings */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        {/* Settings icon */}
        <Pressable style={styles.settings}>
          <Ionicons name="settings-outline" size={30} color={"blue"} />
        </Pressable>
      </View>

      {/* Profile Picture and Username */}
      <View style={styles.profileContainer}>
        <Image
          source={require("@/assets/images/smart.png")}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{userData?.fullname}</Text>
        <Text style={styles.userInfo}>{userData?.email}</Text>
        <Text style={styles.userInfo}>
          Account Number:{" "}
          <Text style={styles.accountNumber}>
            {userData?.phone ? userData.phone.substring(1) : ""}{" "}
            {/* //substring(1)is used remove the first digit from the userData.phone */}
          </Text>
        </Text>
      </View>

      {/* Account Overview */}
      <View style={styles.accountOverview}>
        <Text style={styles.sectionTitle}>Account Overview</Text>
        <View style={styles.accountDetails}>
          <Text style={styles.balanceText}>
            Balance: ₦{walletBalance.toFixed(2)}
          </Text>
          <Text style={styles.otherDetails}>Total Transactions: 52</Text>
        </View>
      </View>

      {/* Options / Action Buttons */}
      <View style={styles.actionsContainer}>
        {/* Edit Profile */}
        <Pressable
          style={styles.actionButton}
          onPress={() => router.push("/screen/PersonalInfo/EditPersonalInfo")}
        >
          <Ionicons name="person-circle-outline" size={24} color={"#fefefe"} />
          <Text style={styles.actionText}>Edit Profile</Text>
        </Pressable>
        {/* Security Settings */}
        <Pressable
          style={styles.actionButton}
          onPress={() => router.push("/screen/PersonalInfo/SecuritySetting")}
        >
          <Ionicons name="lock-closed-outline" size={24} color={"#fefefe"} />
          <Text style={styles.actionText}>Security Settings</Text>
        </Pressable>
        {/* Transaction History */}
        <Pressable
          style={styles.actionButton}
          onPress={() => router.push("/(tabs)/transaction")}
        >
          <Ionicons name="receipt-outline" size={24} color={"#fefefe"} />
          <Text style={styles.actionText}>Transaction History</Text>
        </Pressable>
        {/* Logout Button */}
        <Pressable style={styles.actionButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color={"red"} />
          <Text style={[styles.actionText, styles.logoutText]}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    // color: "blue",
  },
  settings: {
    padding: 5,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  accountNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: "600",
  },
  userInfo: {
    fontSize: 14,
    marginTop: 5,
    // color: "blue",
  },
  accountOverview: {
    backgroundColor: "#0A2E36",
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fefefe",
    marginBottom: 10,
  },
  accountDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fefefe",
  },
  otherDetails: {
    fontSize: 14,
    color: "#A9A9A9",
  },
  actionsContainer: {
    marginTop: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A2E36",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: "#EDEDED",
    borderWidth: 1,
  },
  actionText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#fefefe",
  },
  logoutText: {
    color: "#FF3B30",
  },
});
