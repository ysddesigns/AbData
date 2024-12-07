import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useWallet } from "@/context/waletContext";

const Text = ThemedText;
const View = ThemedView;
const AirtimePurchase = () => {
  const { walletBalance } = useWallet();
  return (
    <View>
      {/* Show Wallet Balance */}
      <View style={styles.walletalanceContainer}>
        <Text style={styles.balanceText}>
          Wallet Balance:
          <Text style={styles.walletBalance}> ₦{walletBalance.toFixed(2)}</Text>
        </Text>
      </View>
      {/* List of Providers */}
      <Text style={styles.selectProvider}>Select Provider</Text>
      <View style={styles.networkProviderImageContainer}>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/mtn.png")}
            style={styles.networkProviderImage}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/airtel.png")}
            style={styles.networkProviderImage}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/glo.jpg")}
            style={styles.networkProviderImage}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/nineMobile.jpg")}
            style={styles.networkProviderImage}
          />
        </TouchableOpacity>
      </View>
      {/* Phone Number */}
      <Text style={styles.text}>Phone Number</Text>
      <TextInput
        placeholder="phone number"
        value=""
        onChangeText={() => {}}
        inputMode="numeric"
        autoFocus
        style={styles.inputPhoneNumber}
      />
      <Text style={styles.text}>Amount</Text>
      <TextInput
        placeholder="amount"
        value=""
        onChangeText={() => {}}
        inputMode="numeric"
        style={styles.inputPhoneNumber}
      />

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AirtimePurchase;

const styles = StyleSheet.create({
  selectProvider: {
    textAlign: "center",
    margin: 7,
    fontWeight: "bold",
    fontSize: 23,
  },
  walletalanceContainer: {
    backgroundColor: "#05161A",
    margin: 12,
  },
  balanceText: {
    color: "#fefefe",
    padding: 12,
  },
  walletBalance: {
    fontWeight: "bold",
    color: "#fefefe",
    fontSize: 18,
  },
  networkProviderImageContainer: {
    margin: 9,

    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  networkProviderImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 50,
  },
  inputPhoneNumber: {
    borderWidth: 1,
    borderRadius: 7,
    padding: 12,
    margin: 12,
  },
  text: {
    marginLeft: 12,
  },
  nextButton: {
    backgroundColor: "#05161A",
    margin: 12,
    padding: 12,
    borderRadius: 12,
  },
  nextText: {
    color: "#fefefe",
    textAlign: "center",
    fontWeight: "bold",
  },
});
