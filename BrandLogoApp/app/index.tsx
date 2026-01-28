import { useRouter, } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Auth from "./components/Auth";
import { useAuth } from "./components/AuthProvider";
import colors from "./styles/colors";

export default function IndexScreen() {
  const router = useRouter();
  const { session, isLoading } = useAuth();
  useEffect(() => {
    if (session?.user) {
      // Replace prevents going "back" to login screen
      router.replace("../(tabs)");
    }
  }, [router, session]);

  if (isLoading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  if (session?.user) {
    // Redirecting — nothing to render
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../assets/images/iconlogotrans.png")} style={{ width: 120, height: 100, marginBottom: 20 }} />
       <Auth/>
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
