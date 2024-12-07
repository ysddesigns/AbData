import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React from "react";

import HomeHeader from "../screen/Home/HomeHeader";
import Assets from "../screen/Home/Assets";
import HomeMenu from "../screen/Home/HomeMenu";

const HomeScreen = () => {
  const fundwalletBtn = {};
  return (
    <SafeAreaView style={styles.container}>
      {/* User Profile Info */}
      <ScrollView>
        <HomeHeader />
        {/* user Assets Innfo */}
        <Assets />

        {/* Home Menu */}
        <HomeMenu />

        {/* Ads Info */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
