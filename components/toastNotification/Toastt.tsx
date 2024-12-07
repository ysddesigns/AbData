import React, { useState, useEffect } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

const ToastNotification = ({
  visible,
  message,
  backgroundColor,
}: {
  visible: boolean;
  message: string;
  backgroundColor?: string;
}) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 3000);
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.toastContainer, { opacity }, { backgroundColor }]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 5,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 8,
    zIndex: 1000,
  },
  toastText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default ToastNotification;
