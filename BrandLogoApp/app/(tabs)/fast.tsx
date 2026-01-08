import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import defaultStyles from "../styles/defaultStyles";

export default function FamilyScreen() {
  return (
    <SafeAreaView style={defaultStyles.pageContainer}>
      <Text style={defaultStyles.bodyText}>My Family</Text>
    </SafeAreaView>
  );
}