import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";

export default function AppHeader() {
  return <View style={styles.container}>
        <Text style={styles.header}>Palatine Hangout Finder</Text>
        <Image source={require("../../assets/images/iconlogotrans.png")} style={styles.image} />
  </View>;
}
const styles = StyleSheet.create({
  container: {
    height: 67,
    backgroundColor: colors.umberrr,
    justifyContent: "center",
    alignItems: "center",
  },
  header:{
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  image:{
    width: 60,
    height: 60,
    position: "absolute",
    right: 10,
    top: 5,
  }
});