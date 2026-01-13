import { Image, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../styles/colors";

export default function AppHeader() {
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <Text style={styles.header}>Palatine Hangout Finder</Text>
      <Image
        source={require("../../assets/images/iconlogotrans.png")}
        style={styles.image}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.umberrr,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 70,
    height: 60,
  },
});
