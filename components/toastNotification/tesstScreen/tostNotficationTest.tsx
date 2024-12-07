import React, { useState } from "react";
import { View, Button } from "react-native";
import ToastNotification from "../toast";

const Tests = () => {
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000); // Hide after 3 seconds
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Show Toast" onPress={showToast} />
      <ToastNotification
        message="This is a reusable toast!"
        visible={toastVisible}
        backgroundColor="red"
        textColor="white"
        position="top"
      />
    </View>
  );
};

export default Tests;
