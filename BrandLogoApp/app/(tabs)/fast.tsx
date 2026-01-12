import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../styles/colors";
import defaultStyles from "../styles/defaultStyles";

export default function FamilyScreen() {
  return (
    <SafeAreaView style={defaultStyles.pageContainer}>
      <Text style={defaultStyles.bodyText}>This tab is to figure out what to do when you want to</Text>
      <Text style={defaultStyles.bodyText}>sit down and have food with friends</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: colors.beige,
  },
  header:{
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  image:{
    width: 10,
    height: 100,
    position: "absolute",
    right: 10,
    top: 5,
  }
});