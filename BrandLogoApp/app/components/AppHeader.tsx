import { supabase } from "@/utils/supabase";
import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { Alert, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../styles/colors";
function getTitleFromPath(pathname: string) {
  if (pathname === "/") return "Welcome";
  if (pathname.includes("index")) return "Home";
  if (pathname.includes("roster")) return "Roster";
  if (pathname.includes("profile")) return "Edit Profile";
  return "App";
}

export default function AppHeader() {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);

   async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        Alert.alert("Logout failed", error.message);
      }
    } catch (err: any) {
      Alert.alert("Logout failed", err?.message ?? String(err));
    }
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <Text style={styles.header}>Palatine Hangout Finder</Text>
      <Image
        source={require("../../assets/images/iconlogotrans.png")}
        style={styles.image}
      />
      <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          accessibilityRole="button"
          accessibilityLabel="Log out"
        >
          <Ionicons name="log-out-outline" size={24} color={colors.beige} />
        </TouchableOpacity>
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
  logoutButton: {
    padding: 6,
    borderRadius: 6,
    // optional: a subtle touch target background when pressed
    // backgroundColor: "rgba(255,255,255,0.03)",
  },
});
