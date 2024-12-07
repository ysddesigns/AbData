import React, { useRef, useMemo, useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import SelectPaymentMethod from "../screens/activities/newfolder/selectPaymentMethod";

const AtmFunding = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [amount, setAmount] = useState("");

  // Snap points for the bottom sheet
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // Function to open the bottom sheet
  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  // Function to close the bottom sheet
  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  // Function to handle the proceed button action
  const handleProceed = () => {
    if (amount) {
      console.log("Proceeding with amount:", amount);
      // Here you can add logic to process the amount
    }
    handleCloseBottomSheet();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>

      {/* Render the SelectPaymentMethod component */}
      <SelectPaymentMethod onAtmFundingPress={handleOpenBottomSheet} />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // The sheet is hidden initially
        snapPoints={snapPoints}
      >
        <View style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>Enter Amount</Text>

          {/* Input field for the amount */}
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          {/* Buttons: Proceed and Cancel */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.proceedButton} onPress={handleProceed}>
              <Text style={styles.buttonText}>Proceed</Text>
            </Pressable>

            <Pressable
              style={styles.cancelButton}
              onPress={handleCloseBottomSheet}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sheetContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  proceedButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AtmFunding;
