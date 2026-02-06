//copied sitdown.tsx and js changed it to show the loc
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { useAuth } from "../components/AuthProvider";
import Button from "../components/Button";
import colors from "../styles/colors";
import defaultStyles from "../styles/defaultStyles";

export default function ToggleShowLocScreen() {
  const { session, isLoading: authLoading } = useAuth();
  const [showLoc, setShowLoc] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!session?.user) {
        if (mounted) {
          setShowLoc(null);
          setLoading(false);
        }
        return;
      }
      setLoading(true);
      try {
        const userId = session.user.id;
        const { data, error } = await supabase
          .from("profiles")
          .select("show_loc")
          .eq("id", userId)
          .maybeSingle();

        if (error) {
          console.warn("load show_loc error", error);
          Alert.alert("Error loading setting", error.message || String(error));
        } else if (mounted) {
          setShowLoc(Boolean(data?.show_loc));
        }
      } catch (err) {
        console.warn(err);
        Alert.alert("Error loading setting", String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [session]);

  async function toggle() {
    if (!session?.user) {
      Alert.alert("Not signed in");
      return;
    }
    const userId = session.user.id;
    const newVal = !Boolean(showLoc);
    setSaving(true);
    try {
      const payload = { id: userId, show_loc: newVal };
      const { data, error } = await supabase
        .from("profiles")
        .upsert(payload)
        .select()
        .maybeSingle();

      if (error) {
        console.warn("toggle error", error);
        Alert.alert("Update failed", error.message || String(error));
      } else {
        setShowLoc(Boolean(data?.show_loc));
      }
    } catch (err) {
      console.warn(err);
      Alert.alert("Update failed", String(err));
    } finally {
      setSaving(false);
    }
  }

  if (authLoading || loading) {
    return (
      <View style={defaultStyles.pageContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={defaultStyles.pageContainer}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>
        Show Location: {showLoc ? "ON" : "OFF"}
      </Text>
      <Button
        title={saving ? "Updating..." : showLoc ? "Turn OFF" : "Turn ON"}
        onPress={toggle}
      />
    </View>
  );
}
