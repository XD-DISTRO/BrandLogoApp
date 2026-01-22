import { useRouter } from "expo-router";
import React from "react";
import { Button, Image, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../styles/colors";
import TextField from "./TextField";

export default function IndexScreen() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const hasMinLength = (text: string, min: number): boolean => {
    return text.length >= min;
};

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/images/iconlogotrans.png")} style={{ width: 120, height: 100, marginBottom: 20 }} />
      <Text style={styles.text}>Welcome to the App</Text>
      <Text style={styles.subtext}>enter your name and password</Text>
      <TextField
        value={name}
        setValue={setName}
        placeholder="Name"
        secure={false}
      />
      <TextField
        value={password}
        setValue={setPassword}
        placeholder="Password"
        secure={true}
      />
      <Button
        title="Enter App"
        color={colors.primary}
        onPress={() => router.push("/(tabs)/fast")}
      />
      <Button
        title="Sign Up"
        color={colors.primary}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.umberrr,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 20,
  },
  subtext: {
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 20,
  },
});
