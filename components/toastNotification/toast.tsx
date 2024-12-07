import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface ToastNotificationProps {
  message: string;
  visible: boolean;
  backgroundColor?: string; // Optional prop to customize background color
  textColor?: string; // Optional prop to customize text color
  position?: "top" | "bottom"; // Optional prop to customize position (default is bottom)
}

const ToastNotificationTest: React.FC<ToastNotificationProps> = ({
  message,
  visible,
  backgroundColor = "black", // Default background color
  textColor = "white", // Default text color
  position = "bottom", // Default position
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200 });
      translateY.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      });
    } else {
      opacity.value = withTiming(0, { duration: 500 });
      translateY.value = withTiming(50, {
        duration: 500,
        easing: Easing.in(Easing.ease),
      });
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        animatedStyle,
        { backgroundColor }, // Apply background color from prop
        position === "top" ? { top: 100 } : { bottom: 100 }, // Adjust position
      ]}
    >
      <Text style={[styles.toastText, { color: textColor }]}>{message}</Text>
    </Animated.View>
  );
};

export default ToastNotificationTest;

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 10,
  },
  toastText: {
    textAlign: "center",
  },
});
