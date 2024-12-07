import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeHeader from "./HomeHeader";
import Assets from "./Assets";
import HomeMenu from "./HomeMenu";

const Home = () => {
  return (
    <View style={styles.container}>
      {/* ../screens/Home */}
      {/* user profile info */}
      <HomeHeader />

      {/* user assets info */}
      <Assets />

      {/* home menu */}
      <HomeMenu />

      {/* ads info */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default Home;
