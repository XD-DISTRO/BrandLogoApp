import React from "react";
import { Text, View } from "react-native";
import defaultStyles from "./styles/defaultStyles";

export default function HomeScreen() {
  return (
    <View style={defaultStyles.pageContainer}>
      <Text style={defaultStyles.bodyText}>Best Home Page</Text>
    </View>
  );
}
