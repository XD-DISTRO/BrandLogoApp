import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import colors from "./styles/colors";

export default function IndexScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the App</Text>
      <Button
        title="Enter App"
        color={colors.primary}
        onPress={() => router.push("/(tabs)/fast")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 20,
  },
});
