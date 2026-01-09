import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../styles/colors";

export default function AppHeader() {
  return <View style={styles.container}>
        <Text style={styles.header}>W Eats</Text>
        <Image
          source={require("../../assets/images/android-icon-background.png")}
          style={styles.image}
        />
  </View>;
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