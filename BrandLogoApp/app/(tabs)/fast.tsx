// app/roster.tsx
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import RosterRow, { RosterProfile } from "../components/RosterRow";
import colors from "../styles/colors";
import defaultStyles from "../styles/defaultStyles";

/*
  Roster Screen
  - Fetches all profiles
  - Displays them in a FlatList
  - Listens for realtime changes to keep data fresh
  - Navigates to /profile/<id> when a row is tapped
*/

export default function RosterScreen() {
  const router = useRouter();

  const [profiles, setProfiles] = useState<RosterProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all profiles from Supabase
  const fetchProfiles = useCallback(async () => {
    setError(null);
    try {
      // NOTE: avoid the single generic on .from() to prevent TypeScript overload errors.
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, location, date, show_loc")
        .order("last_name", { ascending: true })
        .order("first_name", { ascending: true });

      if (error) {
        console.error("fetchProfiles error:", error);
        setError(error.message ?? "Failed to load roster");
        setProfiles([]);
        return;
      }

      // data may be typed as any[] here; we map it to our local state type
      setProfiles((data ?? []) as RosterProfile[]);
    } catch (err) {
      console.error("fetchProfiles exception:", err);
      setError(String(err));
      setProfiles([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProfiles();
  }, [fetchProfiles]);

  useEffect(() => {
    fetchProfiles();

    const table = "profiles";
    let channel: any;
    let legacySubscription: any;

    // Subscribe to realtime updates using modern channel API if available
    try {
      channel = supabase
        .channel(`public-${table}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table,
          },
          () => {
            // simple and safe: re-fetch the list on any change
            fetchProfiles();
          },
        )
        .subscribe();
    } catch (err) {
      console.warn("Channel API failed, using legacy realtime:", err);

      // Legacy API: use `any` to bypass strict typing issues in some SDK versions.
      // This keeps runtime behavior (receiving realtime events) while avoiding compile errors.
      try {
        legacySubscription = (supabase as any)
          .from(table)
          .on("*", () => {
            fetchProfiles();
          })
          .subscribe();
      } catch (err2) {
        console.warn("Legacy realtime subscribe also failed:", err2);
      }
    }

    return () => {
      // Cleanup modern channel
      if (channel) {
        try {
          supabase.removeChannel?.(channel);
        } catch (err) {
          if (channel.unsubscribe) channel.unsubscribe();
        }
      }
      // Cleanup legacy subscription
      if (legacySubscription) {
        try {
          legacySubscription.unsubscribe?.();
        } catch (err) {
          // ignore
        }
      }
    };
  }, [fetchProfiles]);

  return (
    <View style={defaultStyles.pageContainer}>
      <Text style={styles.title}>Where Are Your Friends Right Now?</Text>

      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RosterRow item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 12,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 6,
  },
  errorText: {
    color: "red",
    marginBottom: 12,
  },
  retryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  retryText: {
    color: "white",
  },
  //generated these custom styles using chatgpt
  card: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },

    // Android shadow
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  location: {
    marginTop: 6,
    color: "#555",
  },
  date: {
    marginTop: 4,
    fontSize: 12,
    color: "#888",
  },
});
