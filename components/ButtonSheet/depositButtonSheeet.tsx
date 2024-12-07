import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View, Text, Pressable } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// Get the screen height for positioning
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface DepositButtonSheetProps {
  onClose: () => void; // Prop to handle closing the sheet
}

const DepositButtonSheet: React.FC<DepositButtonSheetProps> = ({ onClose }) => {
  const translateY = useSharedValue(SCREEN_HEIGHT); // Start off-screen
  const context = useSharedValue({ y: 0 });

  // Define the gesture for dragging the bottom sheet
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value }; // Save the current position
    })
    .onUpdate((event) => {
      // Update the position based on drag
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd(() => {
      // Close the sheet if dragged down enough, otherwise return to the original position
      if (translateY.value > SCREEN_HEIGHT / 4) {
        onClose(); // Call the close function passed as a prop
      } else {
        translateY.value = withTiming(0); // Return to original position
      }
    });

  useEffect(() => {
    // Show the bottom sheet when component mounts
    translateY.value = withTiming(-SCREEN_HEIGHT / 3); // Initial position
  }, [translateY]);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }], // Apply the translation
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheet, rBottomSheetStyle]}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
        <View style={styles.line} />
        {/* Additional content for your bottom sheet */}
        <Text style={styles.contentText}>This is the Deposit Button Sheet</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderRadius: 23,
    overflow: "hidden",
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "gray",
    alignSelf: "center",
    marginVertical: 16,
    borderRadius: 2,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#007BFF", // Color for the close button text
  },
  contentText: {
    padding: 16,
    fontSize: 16,
    color: "#05161A",
  },
});

export default DepositButtonSheet;
