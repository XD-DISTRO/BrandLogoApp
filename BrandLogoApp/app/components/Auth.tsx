import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import { Alert, AppState, AppStateStatus, Button, Image, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../styles/colors";
import TextField from "./TextField";

export default function Auth() {
  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("123456");
  
  const hasMinLength = (text: string, min: number): boolean => {
    return text.length >= min;
  };
  
   useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === "active") {
        supabase.auth.startAutoRefresh();
      } else {
        try {
          supabase.auth.stopAutoRefresh();
        } catch {}
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    if (AppState.currentState === "active") {
      supabase.auth.startAutoRefresh();
    }

    return () => {
      if (typeof subscription?.remove === "function") {
        subscription.remove();
      }
      try {
        supabase.auth.stopAutoRefresh();
      } catch {}
    };
  }, []);

  async function signInWithEmail() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    }
  }

  async function signUpWithEmail() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../assets/images/iconlogotrans.png")} style={{ width: 120, height: 100, marginBottom: 20 }} />
      <Text style={styles.text}>Welcome to the App</Text>
      <Text style={styles.subtext}>enter your name and password</Text>
      <TextField
        value={email}
        setValue={setEmail}
        placeholder="Name"
        secure={false}
      />
      <TextField
        value={password}
        setValue={setPassword}
        placeholder="Password"
        secure={true}
      />
      <Button title="Sign in" onPress={signInWithEmail} />
      <Button title="Sign up" onPress={signUpWithEmail} />
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
