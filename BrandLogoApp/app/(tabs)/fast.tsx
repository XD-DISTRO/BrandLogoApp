//used TextInput component instead of TextField component
// link : https://reactnative.dev/docs/textinput

import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextField from "../components/TextField";
import colors from "../styles/colors";
import defaultStyles from "../styles/defaultStyles";

export default function FamilyScreen() {
  return (
    <SafeAreaView style={defaultStyles.pageContainer}>
      <TextField
        value="first name"
        setValue={() => {}}
      />
      <TextField
        value="last name"
        setValue={() => {}}
      />
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
    width: 100,
    height: 100,
    position: "absolute",
    right: 10,
    top: 5,
  }
});