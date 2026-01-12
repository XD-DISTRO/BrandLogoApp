import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import defaultStyles from "../styles/defaultStyles";

export default function SchoolScreen() {
  return (
    <SafeAreaView style={defaultStyles.pageContainer}>
      <Text style={defaultStyles.bodyText}>This tab is to figure out what to do when you want to</Text>
      <Text style={defaultStyles.bodyText}>find a place to just hangout or chill with friends</Text>
    </SafeAreaView>
  );
}