import React from "react";
import { Text, View } from "react-native";
import defaultStyles from "../styles/defaultStyles";

export default function FamilyScreen() {
  return (
    <View style={defaultStyles.pageContainer}>
      <Text style={defaultStyles.bodyText}>My Family</Text>
    </View>
  );
}