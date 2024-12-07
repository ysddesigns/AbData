import DepositButtonSheeet from "@/components/ButtonSheet/depositButtonSheeet";
import { StatusBar, StyleSheet, View, ScrollView } from "react-native";

import PaymentError from "../screen/Wallet/Funding/payment-error";
import Profile from "../screen/PersonalInfo/ProfileInfo";

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.Container}>
      <Profile />
      {/* <PaymentSuccess /> */}
      {/* <PaymentError /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
  },
});
